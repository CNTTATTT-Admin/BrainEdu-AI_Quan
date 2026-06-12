package com.brainedu.BrainEdu.service.enrollmentService;

import com.brainedu.BrainEdu.common.enums.EnrollmentStatus;
import com.brainedu.BrainEdu.common.enums.PaymentStatus;
import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.EnrollmentRequest.*;
import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.*;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Enrollment;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.EnrollmentMapper;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.EnrollmentRepository;
import com.brainedu.BrainEdu.repository.PaymentRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.enrollmentService.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl
        implements EnrollmentService {

    private final EnrollmentRepository
            enrollmentRepository;

    private final CourseRepository
            courseRepository;

    private final UserRepository
            userRepository;

    private final EnrollmentMapper
            enrollmentMapper;

    private final CurrentUserService
            currentUserService;
    private final PaymentRepository 
                paymentRepository;
    private final StringRedisTemplate redisTemplate;


        @Transactional
        @Override
                public EnrollmentResponse enroll(EnrollmentRequest request) {
                User user = currentUserService.getCurrentUser();
                String lockKey = "course_enroll:" + request.getCourseId();

                Long currentEnrollment = redisTemplate.opsForValue().increment(lockKey);
                if (currentEnrollment != null && currentEnrollment > 100) { // Thay 100 bằng giới hạn của khóa học
                        redisTemplate.opsForValue().decrement(lockKey);
                        throw new ApiException("Khóa học đã hết chỗ!");
                }

                Course course = courseRepository.findById(request.getCourseId())
                        .orElseThrow(() -> new ApiException("Course not found"));

                if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
                        throw new ApiException("Already enrolled");
                }

                Enrollment enrollment = Enrollment.builder()
                        .user(user)
                        .course(course)
                        .completionPercent(0F)
                        .status(course.isFree() ? EnrollmentStatus.ACTIVE : EnrollmentStatus.PENDING_PAYMENT)
                        .enrolledAt(LocalDateTime.now())
                        .build();

                enrollmentRepository.save(enrollment);

                if (enrollment.getStatus() == EnrollmentStatus.ACTIVE) {
                        courseRepository.incrementTotalEnrolled(course.getId());
                }

                return enrollmentMapper.toResponse(enrollment);
        }
    @Override
    public List<EnrollmentResponse> myCourses() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        return enrollmentRepository
                .findByUserId(
                        user.getId()
                )
                .stream()
                .map(
                        enrollmentMapper::toResponse
                )
                .toList();
    }

    @Override
    public EnrollmentResponse getById(
            Long id
    ) {

        Enrollment enrollment =
                enrollmentRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Enrollment not found"
                                )
                        );

        return enrollmentMapper.toResponse(
                enrollment
        );
    }

    @Override
        public String cancel(Long id) {

        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ApiException("Enrollment not found"));

        enrollment.setStatus(EnrollmentStatus.REJECTED);

        enrollmentRepository.save(enrollment);

        return "Enrollment cancelled";
        }
}