package com.brainedu.BrainEdu.service.courseService;

import com.brainedu.BrainEdu.common.enums.CourseStatus;
import com.brainedu.BrainEdu.common.enums.CourseType;
import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.request.FilterRequest.CourseFilterRequest;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.CourseReview;
import com.brainedu.BrainEdu.entity.CourseReviewHistory;
import com.brainedu.BrainEdu.entity.Enrollment;
import com.brainedu.BrainEdu.entity.Lesson;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.CourseMapper;
import com.brainedu.BrainEdu.mapper.CourseReviewMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.CourseReviewHistoryRepository;
import com.brainedu.BrainEdu.repository.CourseReviewRepository;
import com.brainedu.BrainEdu.repository.EnrollmentRepository;
import com.brainedu.BrainEdu.repository.LessonProgressRepository;
import com.brainedu.BrainEdu.repository.LessonRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.ultils.CurrentUserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        private final CourseReviewRepository courseReviewRepository;
        private final CourseReviewHistoryRepository courseReviewHistoryRepository;
        private final CourseReviewMapper courseReviewMapper;
        

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
        public Page<CourseResponse> getAll(CourseFilterRequest request) {

        User user = currentUserService.getCurrentUser();
        Long userId = user.getId();

        Sort sort;

                if (request.getSortBy() == null || request.getSortBy().isBlank()) {

                sort = Sort.by(
                        Sort.Order.desc("totalEnrolled"),
                        Sort.Order.desc("averageRating")
                );

                } else {

                sort = request.getSortDirection().equalsIgnoreCase("asc")
                        ? Sort.by(request.getSortBy()).ascending()
                        : Sort.by(request.getSortBy()).descending();
                }

        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize(),
                sort
        );

        Page<Course> courses = courseRepository.findAll(
                CourseSpecification.filter(request),
                pageable
        );

        return courses.map(course -> {

                boolean isEnrolled =
                        enrollmentRepository.existsByUserIdAndCourseId(
                                userId,
                                course.getId()
                        );

                return courseMapper.toResponse(
                        course,
                        isEnrolled
                );
                });
        }

        @Override
        public Page<CourseResponse> getByCategory(Long categoryId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        User user = currentUserService.getCurrentUser();

        Long userId = user.getId();

        return courseRepository.findByCategoryId(categoryId, CourseStatus.PUBLISHED, pageable)
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

                if (course.getStatus() == CourseStatus.DRAFT) {
                        throw new ApiException(
                                "Course is not published yet"
                        );
                }

                if (course.getStatus() == CourseStatus.ARCHIVED
                        && !isEnrolled) {

                        throw new ApiException(
                                "Course is no longer available"
                        );
                }

                return courseMapper.toResponse(
                        course,
                        isEnrolled
                );
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

                .filter(enrollment ->
                        enrollment.getCourse().getStatus()
                                != CourseStatus.DRAFT
                )

                .map(enrollment -> {

                        Course course =
                                enrollment.getCourse();

                        int totalLessons =
                                course.getTotalLessons() == null
                                        ? 0
                                        : course.getTotalLessons().intValue();

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
                                .enrollmentId(enrollment.getId())
                                .courseId(course.getId())
                                .courseTitle(course.getTitle())
                                .thumbnail(course.getThumbnail())
                                .progressPercent(progress)
                                .completedLessons(completedLessons)
                                .totalLessons(totalLessons)
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
                                .status(enrollment.getStatus().name())
                                .build();
                })
                .toList();
        }
    @Override
        @Transactional 
        public CourseResponse update(Long id, CourseRequest request) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ApiException("Course not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ApiException("Category not found"));

        User instructor = userRepository.findById(request.getInstructorId())
                .orElseThrow(() -> new ApiException("Instructor not found"));

        course.setCategory(category);
        course.setInstructor(instructor);
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setLevel(request.getLevel());
        
        course.setEstimatedDuration(request.getEstimatedDuration() * 3600);
        
        course.setThumbnail(request.getThumbnail());
        course.setDifficultyScore(request.getDifficultyScore());
        course.setPrice(request.getPrice());
        course.setCourseType(request.getCourseType());

        courseRepository.save(course);

        User currentUser = currentUserService.getCurrentUser();

        boolean isEnrolled = enrollmentRepository.existsByUserIdAndCourseId(
                currentUser.getId(),
                course.getId()
        );

        return courseMapper.toResponse(course, isEnrolled);
        }

        @Override
        @Transactional
        public String delete(Long id) {

        Course course =
                courseRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        course.setStatus(CourseStatus.ARCHIVED);

        return "Course archived successfully";
        }

    @Override
        @Transactional
        public CourseReviewResponse upsertReview(
                Long courseId,
                Long userId,
                CourseReviewRequest request
        ) {

        boolean isEnrolled =
                enrollmentRepository.existsByUserIdAndCourseId(
                        userId,
                        courseId
                );

        if (!isEnrolled) {
                throw new ApiException(
                        "You must be enrolled in this course to leave a review"
                );
        }

        CourseReview review = courseReviewRepository
                .findByCourseIdAndUserId(courseId, userId)
                .orElse(null);

        if (review == null) {

                Course course = courseRepository.findById(courseId)
                        .orElseThrow(() -> new ApiException("Course not found"));

                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new ApiException("User not found"));

                review = CourseReview.builder()
                        .course(course)
                        .user(user)
                        .rating(request.getRating())
                        .comment(request.getComment())
                        .build();

                courseReviewRepository.save(review);

                updateCourseRatingForNewReview(
                        course,
                        request.getRating()
                );

        } else {

                Integer oldRating = review.getRating();

                CourseReviewHistory historyLog =
                        CourseReviewHistory.builder()
                                .courseReview(review)
                                .oldRating(oldRating)
                                .oldComment(review.getComment())
                                .build();

                courseReviewHistoryRepository.save(historyLog);

                review.setRating(request.getRating());
                review.setComment(request.getComment());

                courseReviewRepository.save(review);

                updateCourseRatingForEditedReview(
                        review.getCourse(),
                        oldRating,
                        request.getRating()
                );
        }

        return courseReviewMapper.toResponse(review);
        }

    @Override
    public Page<CourseReviewResponse> getReviewsByCourse(Long courseId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return courseReviewRepository.findByCourseId(courseId, pageable)
                .map(courseReviewMapper::toResponse);
    }

    @Override
    public Page<TopCourseResponse> getTopCourses(TopCourseRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Object[]> rawResults = courseRepository.findTopCoursesOverview(pageable);

        return rawResults.map(row -> TopCourseResponse.builder()
                .courseId(row[0] != null ? ((Number) row[0]).longValue() : null)
                .courseTitle(row[1] != null ? row[1].toString() : null)
                .courseThumbnail(row[2] != null ? row[2].toString() : null)
                .coursePrice(row[3] != null ? ((Number) row[3]).floatValue() : 0.0f)
                .instructorName(row[4] != null ? row[4].toString() : null)
                .totalStudentsEnrolled(row[5] != null ? ((Number) row[5]).longValue() : 0L)
                .averageRating(row[6] != null ? ((Number) row[6]).doubleValue() : 0.0)
                .totalReviews(row[7] != null ? ((Number) row[7]).longValue() : 0L)
                .build());
    }


    private void updateCourseRatingForNewReview(
        Course course,
        int rating
        ) {

        long totalRatings =
                course.getTotalRatings() == null
                        ? 0
                        : course.getTotalRatings();

        double averageRating =
                course.getAverageRating() == null
                        ? 0.0
                        : course.getAverageRating();

        double newAverage =
                (averageRating * totalRatings + rating)
                        / (totalRatings + 1);

        course.setAverageRating(newAverage);
        course.setTotalRatings(totalRatings + 1);

        courseRepository.save(course);
        }

        private void updateCourseRatingForEditedReview(
                Course course,
                int oldRating,
                int newRating
        ) {

        long totalRatings =
                course.getTotalRatings() == null
                        ? 0
                        : course.getTotalRatings();

        if (totalRatings == 0) {
                return;
        }

        double sum =
                course.getAverageRating()
                        * totalRatings;

        sum = sum - oldRating + newRating;

        course.setAverageRating(
                sum / totalRatings
        );

        courseRepository.save(course);
        }
}