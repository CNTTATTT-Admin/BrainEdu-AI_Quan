package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.*;
import com.brainedu.BrainEdu.entity.UserAnswer;
import org.springframework.stereotype.Component;

@Component
public class UserAnswerMapper {

    public UserAnswerResponse toResponse(
            UserAnswer userAnswer
    ) {

        return UserAnswerResponse.builder()

                .id(
                        userAnswer.getId()
                )

                .userId(
                        userAnswer.getUser()
                                .getId()
                )

                .userName(
                        userAnswer.getUser()
                                .getName()
                )

                .questionId(
                        userAnswer.getQuestion()
                                .getId()
                )

                .questionText(
                        userAnswer.getQuestion()
                                .getQuestionText()
                )

                .selectedAnswerId(
                        userAnswer.getSelectedAnswer()
                                .getId()
                )

                .selectedAnswerText(
                        userAnswer.getSelectedAnswer()
                                .getAnswerText()
                )

                .isCorrect(
                        userAnswer.getIsCorrect()
                )

                .responseTime(
                        userAnswer.getResponseTime()
                )

                .submittedAt(
                        userAnswer.getSubmittedAt()
                )

                .build();
    }
}