package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.*;
import com.brainedu.BrainEdu.entity.LessonProgress;
import org.springframework.stereotype.Component;

@Component
public class LessonProgressMapper {

    public LessonProgressResponse toResponse(
            LessonProgress progress
    ) {

        return LessonProgressResponse.builder()

                .id(progress.getId())

                .userId(
                        progress.getUser().getId()
                )

                .userName(
                        progress.getUser()
                                .getName()
                )

                .lessonId(
                        progress.getLesson()
                                .getId()
                )

                .lessonTitle(
                        progress.getLesson()
                                .getTitle()
                )

                .progressPercent(
                        progress.getProgressPercent()
                )

                .learningTime(
                        progress.getLearningTime()
                )

                .completed(
                        progress.getCompleted()
                )

                .lastAccessed(
                        progress.getLastAccessed()
                )

                .build();
    }
}