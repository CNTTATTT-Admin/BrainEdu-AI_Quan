package com.brainedu.BrainEdu.dto.request.UserAnswerRequest;

import lombok.Data;

@Data
public class UserAnswerRequest {

    private Long userId;

    private Long questionId;

    private Long selectedAnswerId;

    private Integer responseTime;
}