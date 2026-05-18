package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.QuizResponse.QuizResponse;
import com.brainedu.BrainEdu.entity.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuizMapper {

    @Mapping(
            target = "lessonId",
            source = "lesson.id"
    )
    @Mapping(
            target = "lessonTitle",
            source = "lesson.title"
    )

    QuizResponse toResponse(
            Quiz quiz
    );
}