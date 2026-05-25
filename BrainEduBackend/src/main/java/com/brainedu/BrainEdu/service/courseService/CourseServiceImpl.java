package com.brainedu.BrainEdu.service.courseService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.CourseMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
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

    @Override
    public CourseResponse create(
            CreateCourseRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

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

        Course course =
                Course.builder()

                        .category(category)

                        .title(
                                request.getTitle()
                        )

                        .description(
                                request.getDescription()
                        )

                        .level(
                                request.getLevel()
                        )

                        .estimatedDuration(
                                request
                                        .getEstimatedDuration()
                        )

                        .thumbnail(
                                request.getThumbnail()
                        )

                        .difficultyScore(
                                request
                                        .getDifficultyScore()
                        )

                        .price(
                                request.getPrice()
                        )

                        .instructor(
                                instructor
                        )

                        .createdAt(
                                LocalDateTime.now()
                        )

                        .build();

        courseRepository.save(course);

        return courseMapper.toResponse(
                course
        );
    }

    @Override
    public Page<CourseResponse> getAll(int page, int size) {
        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );
        return courseRepository
                .findAll(pageable)
                .map(courseMapper::toResponse);
    }

    @Override
    public Page<CourseResponse> getByCategory(
            Long categoryId,
            int page,
            int size
    ) {
        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );

        return courseRepository
                .findByCategoryId(
                        categoryId,
                        pageable
                )
                .map(courseMapper::toResponse);
    }

    @Override
    public CourseResponse getById(
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

        return courseMapper.toResponse(
                course
        );
    }

    @Override
    public CourseResponse update(
            Long id,
            CourseRequest request
    ) {

        Course course =
                courseRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
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

        course.setCategory(category);

        course.setTitle(
                request.getTitle()
        );

        course.setDescription(
                request.getDescription()
        );

        course.setLevel(
                request.getLevel()
        );

        course.setEstimatedDuration(
                request.getEstimatedDuration()
        );

        course.setThumbnail(
                request.getThumbnail()
        );

        course.setDifficultyScore(
                request.getDifficultyScore()
        );

        course.setPrice(
                request.getPrice()
        );

        courseRepository.save(course);

        return courseMapper.toResponse(
                course
        );
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