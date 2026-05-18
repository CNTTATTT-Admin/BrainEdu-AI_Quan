package com.brainedu.BrainEdu.dto.request.QuestionRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class QuestionRequest {

    @NotNull
    @Positive
    private Long quizId;

    @NotNull
    @Positive
    private Long skillId;

    @NotBlank
    private String questionText;

    @NotBlank
    private String difficultyLevel;

    @NotBlank
    private String questionType;

    @NotNull
    @Positive
    private Double weightScore;
}