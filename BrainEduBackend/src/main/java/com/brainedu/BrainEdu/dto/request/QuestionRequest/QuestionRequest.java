package com.brainedu.BrainEdu.dto.request.QuestionRequest;

import lombok.Data;

@Data
public class QuestionRequest {

    private Long quizId;

    private Long skillId;

    private String questionText;

    private String difficultyLevel;

    private String questionType;

    private Float weightScore;
}