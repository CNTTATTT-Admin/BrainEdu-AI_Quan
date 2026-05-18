package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.LessonResponse.LessonResponse;
import com.brainedu.BrainEdu.entity.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonMapper {

    @Mapping(
            target = "courseId",
            source = "course.id"
    )
    @Mapping(
            target = "courseTitle",
            source = "course.title"
    )
    LessonResponse toResponse(
            Lesson lesson
    );
}