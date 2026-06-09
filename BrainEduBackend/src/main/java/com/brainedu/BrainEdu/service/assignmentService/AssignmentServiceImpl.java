package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.common.enums.AssignmentStatus;
import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignmentRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.entity.*;
import com.brainedu.BrainEdu.mapper.AssignmentMapper;
import com.brainedu.BrainEdu.repository.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AssignmentServiceImpl
        implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    private final AssignmentRecipientRepository recipientRepository;

    private final AssignmentMapper assignmentMapper;

    private final CourseRepository courseRepository;

    private final AssignmentSubmissionRepository submissionRepository;

    private final QuizRepository quizRepository;

    private final UserRepository userRepository;

    private final EnrollmentRepository enrollmentRepository;

    private final StudentGroupMemberRepository memberRepository;

    private final CurrentUserService currentUserService;

    @Override
    public AssignmentResponse create(
            AssignmentRequest request
    ) {

        Assignment assignment =
                assignmentMapper.toEntity(request);

        assignment.setCourse(
                courseRepository.findById(
                        request.getCourseId()
                ).orElseThrow()
        );

        if (request.getQuizId() != null) {

            assignment.setQuiz(
                    quizRepository.findById(
                            request.getQuizId()
                    ).orElseThrow()
            );
        }

        assignment.setStatus(
                AssignmentStatus.DRAFT
        );

        assignment =
                assignmentRepository.save(
                        assignment
                );

        createRecipients(
                assignment,
                request
        );

        return assignmentMapper.toResponse(
                assignment
        );
    }

    private void createRecipients(
            Assignment assignment,
            AssignmentRequest request
    ) {

        switch (request.getTarget()) {

            case COURSE -> {

                List<User> students =
                        enrollmentRepository
                                .findStudentsByCourseId(
                                        request.getCourseId()
                                );

                students.forEach(student -> {

                    AssignmentRecipient recipient =
                            new AssignmentRecipient();

                    recipient.setAssignment(
                            assignment
                    );

                    recipient.setStudent(
                            student
                    );

                    recipientRepository.save(
                            recipient
                    );
                });
            }

            case STUDENT -> {

                request.getStudentIds()
                        .forEach(studentId -> {

                            AssignmentRecipient recipient =
                                    new AssignmentRecipient();

                            recipient.setAssignment(
                                    assignment
                            );

                            recipient.setStudent(
                                    userRepository
                                            .findById(studentId)
                                            .orElseThrow()
                            );

                            recipientRepository.save(
                                    recipient
                            );
                        });
            }

            case GROUP -> {

                List<StudentGroupMember>
                        members =
                        memberRepository
                                .findByGroupId(
                                        request.getGroupId()
                                );

                members.forEach(member -> {

                    AssignmentRecipient recipient =
                            new AssignmentRecipient();

                    recipient.setAssignment(
                            assignment
                    );

                    recipient.setStudent(
                            member.getStudent()
                    );

                    recipientRepository.save(
                            recipient
                    );
                });
            }
        }
    }

    @Override
    public AssignmentResponse getById(
            Long id
    ) {

        return assignmentMapper.toResponse(
                assignmentRepository
                        .findById(id)
                        .orElseThrow()
        );
    }

    @Override
    public List<AssignmentResponse>
    getByCourse(
            Long courseId
    ) {

        return assignmentRepository
                .findByCourseId(courseId)
                .stream()
                .map(
                        assignmentMapper::toResponse
                )
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AssignmentResponse> getMyAssignments() {

        Long userId =
                currentUserService.getCurrentUserId();

        List<AssignmentRecipient> recipients =
                recipientRepository.findByStudentId(userId);

        return recipients.stream()
                .map(recipient -> {

                    Assignment assignment = recipient.getAssignment();

                    AssignmentSubmission submission =
                            submissionRepository
                                    .findByAssignmentIdAndStudentId(
                                            assignment.getId(),
                                            userId
                                    )
                                    .orElse(null);

                    AssignmentResponse response =
                            assignmentMapper.toResponse(assignment);

                    // submission status
                    response.setSubmissionStatus(
                            submission != null
                                    ? submission.getStatus()
                                    : SubmissionStatus.NOT_SUBMITTED
                    );

                    // score + feedback
                    if (submission != null) {
                        response.setScore(submission.getScore());
                        response.setFeedback(submission.getFeedback());
                    }

                    return response;
                })
                .toList();
    }

    @Override
    public void publish(Long id) {

        Assignment assignment =
                assignmentRepository
                        .findById(id)
                        .orElseThrow();

        assignment.setStatus(
                AssignmentStatus.PUBLISHED
        );

        assignmentRepository.save(
                assignment
        );
    }

    @Override
    public void close(Long id) {

        Assignment assignment =
                assignmentRepository
                        .findById(id)
                        .orElseThrow();

        assignment.setStatus(
                AssignmentStatus.CLOSED
        );

        assignmentRepository.save(
                assignment
        );
    }

    @Override
    public void delete(Long id) {

        assignmentRepository.deleteById(
                id
        );
    }

    @Override
        @Transactional(readOnly = true)
        public List<AssignmentResponse> getByCourseForInstructor(Long courseId) {
        Long instructorId = currentUserService.getCurrentUserId();

        List<Object[]> results = assignmentRepository
                .findByCourseIdAndCourseInstructorIdWithSubmissionCount(courseId, instructorId);

        return results.stream()
                .map(result -> {
                        Assignment assignment = (Assignment) result[0];
                        Long submissionCount = (Long) result[1];

                        AssignmentResponse response = assignmentMapper.toResponse(assignment);
                        response.setSubmissionCount(submissionCount.intValue());
                        
                        return response;
                })
                .toList();
        }

    public List<UserResponse> getUnassignedStudentsByCourseAndInstructor(Long courseId, Long assignmentId) {
        boolean assignmentExists = assignmentRepository.existsById(assignmentId);
        if (!assignmentExists) {
            throw new NoSuchElementException("Không tìm thấy bài tập với ID: " + assignmentId);
        }

        Long currentInstructor = currentUserService.getCurrentUserId();

        List<User> students = enrollmentRepository.findUnassignedStudentsByInstructor(
                courseId, 
                currentInstructor, 
                assignmentId
        );
        
        return students.stream()
                .map(student -> {
                    UserResponse dto = new UserResponse();
                    dto.setId(student.getId());
                    dto.setName(student.getName());
                    dto.setEmail(student.getEmail());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}