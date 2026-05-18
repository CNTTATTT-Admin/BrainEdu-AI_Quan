package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AnswerResponse.AnswerResponse;
import com.brainedu.BrainEdu.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    @Mapping(
            target = "questionId",
            source = "question.id"
    )

    @Mapping(
            target = "questionText",
            source = "question.questionText"
    )

    AnswerResponse toResponse(
            Answer answer
    );
}