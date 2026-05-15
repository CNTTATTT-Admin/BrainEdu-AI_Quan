package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.QuestionResponse.*;
import com.brainedu.BrainEdu.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public QuestionResponse toResponse(
            Question question
    ) {

        return QuestionResponse.builder()

                .id(
                        question.getId()
                )

                .quizId(
                        question.getQuiz()
                                .getId()
                )

                .quizTitle(
                        question.getQuiz()
                                .getTitle()
                )

                .skillId(
                        question.getSkill()
                                .getId()
                )

                .skillName(
                        question.getSkill()
                                .getSkillName()
                )

                .questionText(
                        question.getQuestionText()
                )

                .difficultyLevel(
                        question.getDifficultyLevel()
                )

                .questionType(
                        question.getQuestionType()
                )

                .weightScore(
                        question.getWeightScore()
                )

                .build();
    }
}