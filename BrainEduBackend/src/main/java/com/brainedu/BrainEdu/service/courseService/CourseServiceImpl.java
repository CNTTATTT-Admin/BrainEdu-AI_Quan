package com.brainedu.BrainEdu.service.courseService;

import com.brainedu.BrainEdu.common.enums.CourseStatus;
import com.brainedu.BrainEdu.common.enums.CourseType;
import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Enrollment;
import com.brainedu.BrainEdu.entity.Lesson;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.CourseMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.EnrollmentRepository;
import com.brainedu.BrainEdu.repository.LessonProgressRepository;
import com.brainedu.BrainEdu.repository.LessonRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.ultils.CurrentUserService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl
        implements CourseService {

    private final CourseRepository
            courseRepository;

    private final CategoryRepository
            categoryRepository;

    private final UserRepository
            userRepository;

    private final CourseMapper
            courseMapper;
        private final CurrentUserService
                currentUserService;
        private final EnrollmentRepository
                enrollmentRepository;
        private final LessonRepository
                lessonRepository;
        private final LessonProgressRepository
                lessonProgressRepository;
        

    @Override
        public CourseResponse create(CreateCourseRequest request) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Instructor not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException("Category not found"));

        Float price;

        if (request.getCourseType() == CourseType.FREE) {
                price = 0F;
        } else {
                if (request.getPrice() == null || request.getPrice() <= 0) {
                throw new ApiException("Price must be greater than 0");
                }
                price = request.getPrice();
        }

        Course course = Course.builder()
                .category(category)
                .title(request.getTitle())
                .description(request.getDescription())
                .level(request.getLevel())
                .estimatedDuration(request.getEstimatedDuration())
                .thumbnail(request.getThumbnail())
                .courseType(request.getCourseType())
                .status(CourseStatus.DRAFT)
                .price(price)
                .instructor(instructor)
                .createdAt(LocalDateTime.now())
                .build();

        course = courseRepository.save(course);

        return courseMapper.toResponse(course, false);
        }

    @Override
        public Page<CourseResponse> getAll(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        User user = currentUserService.getCurrentUser();

        Long userId = user.getId();

        return courseRepository.findAll(pageable)
                .map(course -> {

                        boolean isEnrolled =
                                enrollmentRepository.existsByUserIdAndCourseId(
                                        userId,
                                        course.getId()
                                );

                        return courseMapper.toResponse(course, isEnrolled);
                });
        }

        @Override
        public Page<CourseResponse> getByCategory(Long categoryId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        User user = currentUserService.getCurrentUser();

        Long userId = user.getId();

        return courseRepository.findByCategoryId(categoryId, pageable)
                .map(course -> {

                        boolean isEnrolled =
                                enrollmentRepository.existsByUserIdAndCourseId(
                                        userId,
                                        course.getId()
                                );

                        return courseMapper.toResponse(course, isEnrolled);
                });
        }
    @Override
        public CourseResponse getById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException("Course not found"));

        User user = currentUserService.getCurrentUser();

        boolean isEnrolled =
                enrollmentRepository.existsByUserIdAndCourseId(
                        user.getId(),
                        id
                );

        return courseMapper.toResponse(course, isEnrolled);
        }
        @Override
        public List<MyCourseResponse> getMyCourses() {

        User currentUser =
                currentUserService.getCurrentUser();

        List<Enrollment> enrollments =
                enrollmentRepository.findByUserId(
                        currentUser.getId()
                );

        return enrollments.stream()
                .map(enrollment -> {

                        Course course =
                                enrollment.getCourse();

                        int totalLessons =
                                lessonRepository.countByCourseId(
                                        course.getId()
                                );

                        long completedLessons =
                                lessonProgressRepository
                                        .countCompletedLessons(
                                                currentUser.getId(),
                                                course.getId()
                                        );

                        float progress =
                                totalLessons == 0
                                        ? 0
                                        : (completedLessons * 100F)
                                        / totalLessons;

                        Lesson nextLesson =
                                lessonRepository
                                        .findRemainingLessons(
                                                currentUser.getId(),
                                                course.getId(),
                                                PageRequest.of(0, 1)
                                        )
                                        .stream()
                                        .findFirst()
                                        .orElse(null);

                        return MyCourseResponse.builder()

                                .enrollmentId(
                                        enrollment.getId()
                                )

                                .courseId(
                                        course.getId()
                                )

                                .courseTitle(
                                        course.getTitle()
                                )

                                .thumbnail(
                                        course.getThumbnail()
                                )

                                .progressPercent(
                                        progress
                                )

                                .completedLessons(
                                        completedLessons
                                )

                                .totalLessons(
                                        totalLessons
                                )

                                .nextLessonId(
                                        nextLesson != null
                                                ? nextLesson.getId()
                                                : null
                                )

                                .nextLessonTitle(
                                        nextLesson != null
                                                ? nextLesson.getTitle()
                                                : null
                                )

                                .status(
                                        enrollment.getStatus()
                                )

                                .build();
                })
                .toList();
        }
    @Override
        public CourseResponse update(Long id, CourseRequest request) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException("Course not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException("Category not found"));

        course.setCategory(category);
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setLevel(request.getLevel());
        course.setEstimatedDuration(request.getEstimatedDuration());
        course.setThumbnail(request.getThumbnail());
        course.setDifficultyScore(request.getDifficultyScore());
        course.setPrice(request.getPrice());

        courseRepository.save(course);

        User currentUser = currentUserService.getCurrentUser();

        boolean isEnrolled =
                enrollmentRepository.existsByUserIdAndCourseId(
                        currentUser.getId(),
                        course.getId()
                );

        return courseMapper.toResponse(course, isEnrolled);
        }

    @Override
    public String delete(
            Long id
    ) {

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
}