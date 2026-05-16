package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.*;
import com.brainedu.BrainEdu.entity.Assignment;
import com.brainedu.BrainEdu.entity.AssignmentSubmission;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.AssignmentRepository;
import com.brainedu.BrainEdu.repository.AssignmentSubmissionRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentAssignmentServiceImpl
        implements StudentAssignmentService {

    private final AssignmentRepository
            assignmentRepository;

    private final AssignmentSubmissionRepository
            submissionRepository;

    private final UserRepository userRepository;

    @Override
    public AssignmentSubmissionResponse
    submitAssignment(
            SubmitAssignmentRequest request
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User student =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        Assignment assignment =
                assignmentRepository
                        .findById(
                                request.getAssignmentId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Assignment not found"
                                )
                        );

        AssignmentSubmission submission =
                AssignmentSubmission.builder()
                        .assignment(assignment)
                        .student(student)
                        .textAnswer(
                                request.getTextAnswer()
                        )
                        .fileUrl(
                                request.getFileUrl()
                        )
                        .submittedAt(
                                LocalDateTime.now()
                        )
                        .status("SUBMITTED")
                        .build();

        submissionRepository.save(submission);

        return AssignmentSubmissionResponse
                .builder()
                .id(submission.getId())
                .assignmentId(
                        assignment.getId()
                )
                .assignmentTitle(
                        assignment.getTitle()
                )
                .studentId(
                        student.getId()
                )
                .studentName(
                        student.getName()
                )
                .textAnswer(
                        submission.getTextAnswer()
                )
                .fileUrl(
                        submission.getFileUrl()
                )
                .submittedAt(
                        submission.getSubmittedAt()
                )
                .status(
                        submission.getStatus()
                )
                .build();
    }

    @Override
    public List<AssignmentSubmissionResponse>
    getMySubmissions() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User student =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        return submissionRepository
                .findByStudentId(
                        student.getId()
                )
                .stream()
                .map(submission ->
                        AssignmentSubmissionResponse
                                .builder()
                                .id(submission.getId())
                                .assignmentId(
                                        submission
                                                .getAssignment()
                                                .getId()
                                )
                                .assignmentTitle(
                                        submission
                                                .getAssignment()
                                                .getTitle()
                                )
                                .score(
                                        submission.getScore()
                                )
                                .feedback(
                                        submission.getFeedback()
                                )
                                .status(
                                        submission.getStatus()
                                )
                                .submittedAt(
                                        submission
                                                .getSubmittedAt()
                                )
                                .build()
                )
                .toList();
    }
}