package com.brainedu.BrainEdu.service.assignmentService;
import com.brainedu.BrainEdu.common.enums.AssignmentType;
import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.PendingAssignmentResponse;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.entity.*;
import com.brainedu.BrainEdu.mapper.SubmissionMapper;
import com.brainedu.BrainEdu.repository.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.brainedu.BrainEdu.common.enums.AssignmentType.ESSAY;

@Service
@RequiredArgsConstructor
@Transactional
public class SubmissionServiceImpl
        implements SubmissionService {

    private final AssignmentRepository assignmentRepository;

    private final AssignmentSubmissionRepository submissionRepository;

    private final AssignmentRecipientRepository assignmentRecipientRepository;

    private final SubmissionMapper mapper;

    private final UserRepository userRepository;

    private final CurrentUserService currentUserService;

    private final FileStorageService fileStorageService;
    @Override
    @Transactional
    public SubmissionResponse submit(
            Long assignmentId,
            String answerText,
            MultipartFile file
    ) {

        Long studentId =
                currentUserService.getCurrentUserId();

        Assignment assignment =
                assignmentRepository.findById(assignmentId)
                        .orElseThrow(() ->
                                new RuntimeException("Assignment not found"));

        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(assignment.getStartAt())) {
            throw new RuntimeException("Assignment not started yet");
        }

        boolean isLate = now.isAfter(assignment.getDueDate());

        boolean allowed =
                assignmentRecipientRepository
                        .existsByAssignmentIdAndStudentId(
                                assignmentId,
                                studentId
                        );

        if (!allowed) {
            throw new RuntimeException("You are not assigned to this assignment");
        }

        User student =
                userRepository.findById(studentId)
                        .orElseThrow();

        AssignmentSubmission submission =
                submissionRepository
                        .findByAssignmentIdAndStudentId(
                                assignmentId,
                                studentId
                        )
                        .orElse(new AssignmentSubmission());

        if (submission.getStatus() == SubmissionStatus.GRADED) {
            throw new RuntimeException("Assignment already graded");
        }

        submission.setAssignment(assignment);
        submission.setStudent(student);

        switch (assignment.getType()) {

            case ESSAY -> {
                if (answerText == null || answerText.isBlank()) {
                    throw new RuntimeException("Essay must have answer text");
                }
                submission.setAnswerText(answerText);
            }

            case FILE_UPLOAD -> {
                if (file == null || file.isEmpty()) {
                    throw new RuntimeException("File is required for FILE_UPLOAD");
                }

                String url =
                        fileStorageService.uploadFile(file);

                submission.setAttachmentUrl(url);
                submission.setAnswerText(answerText); // optional note
            }

            case QUIZ -> {
                // tùy hệ thống quiz của bạn
                submission.setAnswerText("QUIZ_SUBMITTED");
            }

            default -> throw new RuntimeException("Invalid assignment type");
        }

        submission.setSubmittedAt(now);

        submission.setStatus(
                isLate ? SubmissionStatus.LATE : SubmissionStatus.SUBMITTED
        );

        submission = submissionRepository.save(submission);

        return mapper.toResponse(submission);
    }

    @Override
    @Transactional
    public SubmissionResponse grade(
            Long submissionId,
            GradeSubmissionRequest request
    ) {

        Long instructorId =
                currentUserService.getCurrentUserId();

        AssignmentSubmission submission =
                submissionRepository.findById(submissionId)
                        .orElseThrow(() ->
                                new RuntimeException("Submission not found"));

        if (!submission.getAssignment()
                .getInstructor()
                .getId()
                .equals(instructorId)) {
            throw new RuntimeException("Not your assignment");
        }

        if (submission.getStatus() == SubmissionStatus.NOT_SUBMITTED) {
            throw new RuntimeException("Student has not submitted yet");
        }

        if (submission.getStatus() == SubmissionStatus.GRADED) {
            throw new RuntimeException("Already graded");
        }

        Float max = submission.getAssignment().getMaxScore();

        if (request.getScore() < 0 || request.getScore() > max) {
            throw new RuntimeException("Invalid score");
        }

        submission.setScore(request.getScore());
        submission.setFeedback(request.getFeedback());

        submission.setGradedBy(
                userRepository.findById(instructorId).orElseThrow()
        );

        submission.setGradedAt(LocalDateTime.now());
        submission.setStatus(SubmissionStatus.GRADED);

        return mapper.toResponse(
                submissionRepository.save(submission)
        );
    }

    @Override
    public List<SubmissionResponse>
    getByAssignment(
            Long assignmentId
    ) {

        return submissionRepository
                .findByAssignmentId(
                        assignmentId
                )
                .stream()
                .map(
                        mapper::toResponse
                )
                .toList();
    }

    @Override
    public List<SubmissionResponse>
    mySubmissions() {

        Long userId =
                currentUserService.getCurrentUserId();

        return submissionRepository
                .findByStudentId(userId)
                .stream()
                .map(
                        mapper::toResponse
                )
                .toList();
    }

    @Override
        public List<PendingAssignmentResponse> getPendingAssignments() {
        Long instructorId = currentUserService.getCurrentUserId();
        
        List<AssignmentSubmission> submissions = submissionRepository.findPendingSubmissionsByInstructor(
                instructorId, 
                SubmissionStatus.SUBMITTED
        );
        
        return submissions.stream()
                .map(sub -> PendingAssignmentResponse.builder()
                        .submissionId(sub.getId())
                        .assignmentId(sub.getAssignment().getId())
                        .studentName(sub.getStudent().getName())
                        .studentId(sub.getStudent().getId())
                        .studentEmail(sub.getStudent().getEmail())
                        .courseTitle(sub.getAssignment().getCourse().getTitle())
                        .assignmentTitle(sub.getAssignment().getTitle())
                        .submittedAt(sub.getSubmittedAt())
                        .status(sub.getStatus().name())
                        .answerText(sub.getAnswerText()) 
                        .attachmentUrl(sub.getAttachmentUrl()) 
                        .build())
                .collect(Collectors.toList());
        }
}