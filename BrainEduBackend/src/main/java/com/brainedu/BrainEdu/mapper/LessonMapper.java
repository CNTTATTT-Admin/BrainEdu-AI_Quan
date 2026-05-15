package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.LessonResponse.*;
import com.brainedu.BrainEdu.entity.Lesson;
import org.springframework.stereotype.Component;

@Component
public class LessonMapper {

    public LessonResponse toResponse(
            Lesson lesson
    ) {

        return LessonResponse.builder()
                .id(lesson.getId())

                .courseId(
                        lesson.getCourse().getId()
                )

                .courseTitle(
                        lesson.getCourse().getTitle()
                )

                .title(lesson.getTitle())

                .content(
                        lesson.getContent()
                )

                .videoUrl(
                        lesson.getVideoUrl()
                )

                .lessonOrder(
                        lesson.getLessonOrder()
                )

                .estimatedTime(
                        lesson.getEstimatedTime()
                )

                .difficulty(
                        lesson.getDifficulty()
                )

                .build();
    }
}