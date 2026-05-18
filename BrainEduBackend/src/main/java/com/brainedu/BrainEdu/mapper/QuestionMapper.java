package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.QuestionResponse.QuestionResponse;
import com.brainedu.BrainEdu.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    @Mapping(
            target = "quizId",
            source = "quiz.id"
    )
    @Mapping(
            target = "quizTitle",
            source = "quiz.title"
    )

    @Mapping(
            target = "skillId",
            source = "skill.id"
    )
    @Mapping(
            target = "skillName",
            source = "skill.skillName"
    )

    QuestionResponse toResponse(
            Question question
    );
}