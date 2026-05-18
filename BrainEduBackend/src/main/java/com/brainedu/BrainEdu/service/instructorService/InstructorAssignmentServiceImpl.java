package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.*;
import com.brainedu.BrainEdu.entity.*;
import com.brainedu.BrainEdu.repository.*;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InstructorAssignmentServiceImpl
        implements InstructorAssignmentService {

    private final AssignmentRepository assignmentRepository;

    private final AssignmentSubmissionRepository
            submissionRepository;

    private final CourseRepository courseRepository;

    private final UserRepository userRepository;

    @Override
    public AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User instructor =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Instructor not found"
                                )
                        );

        Course course =
                courseRepository
                        .findById(
                                request.getCourseId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        Assignment assignment =
                Assignment.builder()
                        .course(course)
                        .instructor(instructor)
                        .title(request.getTitle())
                        .description(
                                request.getDescription()
                        )
                        .dueDate(
                                request.getDueDate()
                        )
                        .maxScore(
                                request.getMaxScore().floatValue()
                        )
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();

        assignmentRepository.save(assignment);

        return AssignmentResponse.builder()
                .id(assignment.getId())
                .title(assignment.getTitle())
                .description(
                        assignment.getDescription()
                )
                .courseId(course.getId())
                .courseTitle(course.getTitle())
                .instructorId(
                        instructor.getId()
                )
                .instructorName(
                        instructor.getName()
                )
                .dueDate(
                        assignment.getDueDate()
                )
                .maxScore(
                        assignment.getMaxScore()
                )
                .createdAt(
                        assignment.getCreatedAt()
                )
                .build();
    }

    @Override
    public Page<AssignmentResponse>
    getMyAssignments(
            int page,
            int size
    ) {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User instructor =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Instructor not found"
                                )
                        );

        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );

        return assignmentRepository
                .findByInstructorId(
                        instructor.getId(),
                        pageable
                )
                .map(a ->
                        AssignmentResponse.builder()

                                .id(a.getId())

                                .title(a.getTitle())

                                .description(
                                        a.getDescription()
                                )

                                .courseId(
                                        a.getCourse().getId()
                                )

                                .courseTitle(
                                        a.getCourse()
                                                .getTitle()
                                )

                                .dueDate(
                                        a.getDueDate()
                                )

                                .maxScore(
                                        a.getMaxScore()
                                )

                                .createdAt(
                                        a.getCreatedAt()
                                )

                                .build()
                );
    }

    @Override
    public Page<AssignmentSubmissionResponse>
    getSubmissions(
            Long assignmentId,
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );

        return submissionRepository
                .findByAssignmentId(
                        assignmentId,
                        pageable
                )
                .map(this::mapSubmission);
    }

    @Override
    public AssignmentSubmissionResponse
    gradeSubmission(
            Long submissionId,
            GradeSubmissionRequest request
    ) {

        AssignmentSubmission submission =
                submissionRepository
                        .findById(submissionId)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Submission not found"
                                )
                        );

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        User instructor =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Instructor not found"
                                )
                        );

        submission.setScore(
                request.getScore()
        );

        submission.setFeedback(
                request.getFeedback()
        );

        submission.setGradedBy(
                instructor
        );

        submission.setGradedAt(
                LocalDateTime.now()
        );

        submission.setStatus(
                "GRADED"
        );

        submissionRepository.save(submission);

        return mapSubmission(submission);
    }

    private AssignmentSubmissionResponse
    mapSubmission(
            AssignmentSubmission submission
    ) {

        return AssignmentSubmissionResponse
                .builder()
                .id(submission.getId())
                .assignmentId(
                        submission.getAssignment()
                                .getId()
                )
                .assignmentTitle(
                        submission.getAssignment()
                                .getTitle()
                )
                .studentId(
                        submission.getStudent()
                                .getId()
                )
                .studentName(
                        submission.getStudent()
                                .getName()
                )
                .textAnswer(
                        submission.getTextAnswer()
                )
                .fileUrl(
                        submission.getFileUrl()
                )
                .score(
                        submission.getScore()
                )
                .feedback(
                        submission.getFeedback()
                )
                .gradedBy(
                        submission.getGradedBy()
                                != null
                                ? submission
                                  .getGradedBy()
                                  .getName()
                                : null
                )
                .submittedAt(
                        submission.getSubmittedAt()
                )
                .gradedAt(
                        submission.getGradedAt()
                )
                .status(
                        submission.getStatus()
                )
                .build();
    }
}