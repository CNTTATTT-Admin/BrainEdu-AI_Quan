package com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class QuizAnswerRequest {

    @NotNull
    private Long questionId;

    @NotNull
    private Long answerId;
}
