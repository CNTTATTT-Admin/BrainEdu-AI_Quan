package com.brainedu.BrainEdu.dto.request.UserAnswerRequest;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class UserAnswerRequest {

    private Long userId;

    @NotNull
    @Positive
    private Long questionId;

    @NotNull
    @Positive
    private Long selectedAnswerId;
    @NotNull
    @PositiveOrZero
    private Integer responseTime;
}