package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.QuizSubmissionResponse.*;
import com.brainedu.BrainEdu.entity.QuizSubmission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
        componentModel = "spring"
)
public interface QuizSubmissionMapper {

    @Mapping(
            target = "quizId",
            source = "quiz.id"
    )

    @Mapping(
            target = "quizTitle",
            source = "quiz.title"
    )

    QuizSubmissionResponse toResponse(
            QuizSubmission submission
    );
}
