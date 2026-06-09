package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.dto.response.UserResponse.EnrolledStudentResponse;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.EnrollmentRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InstructorCourseServiceImpl
        implements InstructorCourseService {

    private final CourseRepository courseRepository;

    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;
        private final EnrollmentRepository enrollmentRepository;
    @Override
    public CourseResponse createCourse(
            CreateCourseRequest request
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

        Category category =
                categoryRepository
                        .findById(
                                request.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        Course course = Course.builder()
                .title(request.getTitle())
                .description(
                        request.getDescription()
                )
                .price(request.getPrice())
                .category(category)
                .instructor(instructor)
                .build();

        courseRepository.save(course);

        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(
                        course.getDescription()
                )
                .price(course.getPrice())
                .categoryName(
                        category.getCategoryName()
                )
                .build();
    }

    @Override
    public List<CourseResponse> getMyCourses() {

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

        return courseRepository
                .findByInstructorId(
                        instructor.getId()
                )
                .stream()
                .map(course ->
                        CourseResponse.builder()
                                .id(course.getId())
                                .title(course.getTitle())
                                .description(
                                        course.getDescription()
                                )
                                .price(course.getPrice())
                                .categoryName(
                                        course.getCategory()
                                                .getCategoryName()
                                )
                                .build()
                )
                .toList();
    }

    @Override
    public CourseResponse updateCourse(
            Long id,
            CreateCourseRequest request
    ) {

        Course course =
                courseRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        course.setTitle(
                request.getTitle()
        );

        course.setDescription(
                request.getDescription()
        );

        course.setPrice(
                request.getPrice()
        );

        courseRepository.save(course);

        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(
                        course.getDescription()
                )
                .price(course.getPrice())
                .build();
    }

    @Override
    public String deleteCourse(Long id) {

        Course course =
                courseRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        courseRepository.delete(course);

        return "Course deleted successfully";
    }

    @Override
    public List<EnrolledStudentResponse> getStudentsEnrolledInCourse(Long courseId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.getInstructor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You do not have permission to view students of this course");
        }

        return enrollmentRepository.findByCourseIdWithUser(courseId).stream().map(enrollment -> {
            User student = enrollment.getUser();
            return EnrolledStudentResponse.builder()
                    .id(student.getId())
                    .name(student.getName())
                    .email(student.getEmail())
                    .avatar(student.getAvatar())
                    .enrolledAt(enrollment.getEnrolledAt())
                    .completionPercent(enrollment.getCompletionPercent())
                    .enrollmentStatus(enrollment.getStatus().name())
                    .build();
        }).collect(Collectors.toList());
    }
}