package com.brainedu.BrainEdu.service.assignmentService;
import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.entity.*;
import com.brainedu.BrainEdu.mapper.SubmissionMapper;
import com.brainedu.BrainEdu.repository.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SubmissionServiceImpl
        implements SubmissionService {

    private final AssignmentRepository assignmentRepository;

    private final AssignmentSubmissionRepository submissionRepository;

    private final SubmissionMapper mapper;

    private final UserRepository userRepository;

    private final CurrentUserService currentUserService;

    @Override
    public SubmissionResponse submit(
            Long assignmentId,
            SubmitAssignmentRequest request
    ) {

        Long studentId =
                currentUserService.getCurrentUserId();

        Assignment assignment =
                assignmentRepository
                        .findById(
                                assignmentId
                        )
                        .orElseThrow();

        AssignmentSubmission submission =
                submissionRepository
                        .findByAssignmentIdAndStudentId(
                                assignmentId,
                                studentId
                        )
                        .orElse(
                                new AssignmentSubmission()
                        );

        submission.setAssignment(
                assignment
        );

        submission.setStudent(
                userRepository
                        .findById(studentId)
                        .orElseThrow()
        );

        submission.setAnswerText(
                request.getAnswerText()
        );

        submission.setAttachmentUrl(
                request.getAttachmentUrl()
        );

        submission.setSubmittedAt(
                LocalDateTime.now()
        );

        submission.setStatus(
                SubmissionStatus.SUBMITTED
        );

        submission =
                submissionRepository.save(
                        submission
                );

        return mapper.toResponse(
                submission
        );
    }

    @Override
    public SubmissionResponse grade(
            Long submissionId,
            GradeSubmissionRequest request
    ) {

        AssignmentSubmission submission =
                submissionRepository
                        .findById(
                                submissionId
                        )
                        .orElseThrow();

        submission.setScore(
                request.getScore()
        );

        submission.setFeedback(
                request.getFeedback()
        );

        submission.setGradedAt(
                LocalDateTime.now()
        );

        submission.setStatus(
                SubmissionStatus.GRADED
        );

        submission =
                submissionRepository.save(
                        submission
                );

        return mapper.toResponse(
                submission
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
}