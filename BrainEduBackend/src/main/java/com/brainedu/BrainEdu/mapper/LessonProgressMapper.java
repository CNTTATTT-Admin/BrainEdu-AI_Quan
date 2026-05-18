package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.LessonProgressResponse;
import com.brainedu.BrainEdu.entity.LessonProgress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonProgressMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userName", source = "user.name")

    @Mapping(target = "lessonId", source = "lesson.id")
    @Mapping(target = "lessonTitle", source = "lesson.title")

    LessonProgressResponse toResponse(
            LessonProgress progress
    );
}