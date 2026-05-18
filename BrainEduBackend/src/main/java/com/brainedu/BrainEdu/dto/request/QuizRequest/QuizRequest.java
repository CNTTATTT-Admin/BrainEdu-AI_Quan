package com.brainedu.BrainEdu.dto.request.QuizRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class QuizRequest {

    @NotNull
    @Positive
    private Long lessonId;

    @NotBlank
    private String title;

    @NotBlank
    private String quizType;

    @NotNull
    @Positive
    private Integer totalQuestions;

    @NotNull
    @Positive
    private Integer duration;

    @NotNull
    @PositiveOrZero
    private Double passingScore;
}