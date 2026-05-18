package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.UserAnswerResponse;
import com.brainedu.BrainEdu.entity.UserAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserAnswerMapper {

    @Mapping(
            target = "userId",
            source = "user.id"
    )
    @Mapping(
            target = "userName",
            source = "user.name"
    )

    @Mapping(
            target = "questionId",
            source = "question.id"
    )
    @Mapping(
            target = "questionText",
            source = "question.questionText"
    )

    @Mapping(
            target = "selectedAnswerId",
            source = "selectedAnswer.id"
    )
    @Mapping(
            target = "selectedAnswerText",
            source = "selectedAnswer.answerText"
    )

    UserAnswerResponse toResponse(
            UserAnswer userAnswer
    );
}