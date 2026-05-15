package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseResponse toResponse(
            Course course
    ) {

        return CourseResponse.builder()

                .id(course.getId())

                .categoryId(
                        course.getCategory().getId()
                )

                .categoryName(
                        course.getCategory()
                                .getCategoryName()
                )

                .title(course.getTitle())

                .description(
                        course.getDescription()
                )

                .level(course.getLevel())

                .estimatedDuration(
                        course.getEstimatedDuration()
                )

                .thumbnail(
                        course.getThumbnail()
                )

                .difficultyScore(
                        course.getDifficultyScore()
                )

                .createdById(
                        course.getCreatedBy()
                                .getId()
                )

                .createdByName(
                        course.getCreatedBy()
                                .getName()
                )

                .build();
    }
}