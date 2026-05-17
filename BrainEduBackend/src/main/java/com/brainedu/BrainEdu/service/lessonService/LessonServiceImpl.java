package com.brainedu.BrainEdu.service.lessonService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.LessonRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonResponse.*;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Lesson;
import com.brainedu.BrainEdu.mapper.LessonMapper;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.LessonRepository;
import com.brainedu.BrainEdu.service.lessonService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl
        implements LessonService {

    private final LessonRepository
            lessonRepository;

    private final CourseRepository
            courseRepository;

    private final LessonMapper
            lessonMapper;

    @Override
    public LessonResponse create(
            LessonRequest request
    ) {

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

        Lesson lesson =
                Lesson.builder()
                        .course(course)
                        .title(request.getTitle())
                        .content(
                                request.getContent()
                        )
                        .videoUrl(
                                request.getVideoUrl()
                        )
                        .lessonOrder(
                                request.getLessonOrder()
                        )
                        .estimatedTime(
                                request.getEstimatedTime()
                        )
                        .difficulty(
                                request.getDifficulty()
                        )
                        .build();

        lessonRepository.save(lesson);

        return lessonMapper.toResponse(
                lesson
        );
    }

    @Override
    public Page<LessonResponse> getByCourse(
            Long courseId,
            int page,
            int size
    ) {
        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );
        return lessonRepository
                .findByCourseIdOrderByLessonOrderAsc(
                        courseId,
                        pageable
                )
                .map(
                        lessonMapper::toResponse
                );
    }

    @Override
    public LessonResponse getById(
            Long id
    ) {

        Lesson lesson =
                lessonRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Lesson not found"
                                )
                        );

        return lessonMapper.toResponse(
                lesson
        );
    }

    @Override
    public LessonResponse update(
            Long id,
            LessonRequest request
    ) {

        Lesson lesson =
                lessonRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Lesson not found"
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

        lesson.setCourse(course);

        lesson.setTitle(
                request.getTitle()
        );

        lesson.setContent(
                request.getContent()
        );

        lesson.setVideoUrl(
                request.getVideoUrl()
        );

        lesson.setLessonOrder(
                request.getLessonOrder()
        );

        lesson.setEstimatedTime(
                request.getEstimatedTime()
        );

        lesson.setDifficulty(
                request.getDifficulty()
        );

        lessonRepository.save(lesson);

        return lessonMapper.toResponse(
                lesson
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        Lesson lesson =
                lessonRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Lesson not found"
                                )
                        );

        lessonRepository.delete(lesson);

        return "Lesson deleted successfully";
    }
}