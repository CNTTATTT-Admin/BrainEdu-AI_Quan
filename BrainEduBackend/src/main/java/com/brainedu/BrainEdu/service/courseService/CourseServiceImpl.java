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
import com.brainedu.BrainEdu.service.courseService.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
            CourseRequest request
    ) {

        Authentication authentication =
                org.springframework.security.core
                        .context.SecurityContextHolder
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

                        .createdBy(user)

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
    public List<CourseResponse> getAll() {

        return courseRepository.findAll()
                .stream()
                .map(
                        courseMapper::toResponse
                )
                .toList();
    }

    @Override
    public List<CourseResponse> getByCategory(
            Long categoryId
    ) {

        return courseRepository
                .findByCategoryId(
                        categoryId
                )
                .stream()
                .map(
                        courseMapper::toResponse
                )
                .toList();
    }

    @Override
    public CourseResponse getById(
            Long id
    ) {

        Course course =
                courseRepository.findById(id)
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
                courseRepository.findById(id)
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
                courseRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        courseRepository.delete(course);

        return "Course deleted successfully";
    }
}