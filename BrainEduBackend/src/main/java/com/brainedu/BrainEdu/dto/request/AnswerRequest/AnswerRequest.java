package com.brainedu.BrainEdu.dto.request.AnswerRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AnswerRequest {

    @NotNull
    @Positive
    private Long questionId;

    @NotBlank
    private String answerText;

    @NotNull
    private Boolean isCorrect;
}