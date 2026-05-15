package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AnswerResponse.*;
import com.brainedu.BrainEdu.entity.Answer;
import org.springframework.stereotype.Component;

@Component
public class AnswerMapper {

    public AnswerResponse toResponse(
            Answer answer
    ) {

        return AnswerResponse.builder()

                .id(
                        answer.getId()
                )

                .questionId(
                        answer.getQuestion()
                                .getId()
                )

                .questionText(
                        answer.getQuestion()
                                .getQuestionText()
                )

                .answerText(
                        answer.getAnswerText()
                )

                .isCorrect(
                        answer.getIsCorrect()
                )

                .build();
    }
}