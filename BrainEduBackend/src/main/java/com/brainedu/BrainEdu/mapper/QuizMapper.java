package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.QuizResponse.*;
import com.brainedu.BrainEdu.entity.Quiz;
import org.springframework.stereotype.Component;

@Component
public class QuizMapper {

    public QuizResponse toResponse(
            Quiz quiz
    ) {

        return QuizResponse.builder()

                .id(
                        quiz.getId()
                )

                .lessonId(
                        quiz.getLesson()
                                .getId()
                )

                .lessonTitle(
                        quiz.getLesson()
                                .getTitle()
                )

                .title(
                        quiz.getTitle()
                )

                .quizType(
                        quiz.getQuizType()
                )

                .totalQuestions(
                        quiz.getTotalQuestions()
                )

                .duration(
                        quiz.getDuration()
                )

                .passingScore(
                        quiz.getPassingScore()
                )

                .build();
    }
}