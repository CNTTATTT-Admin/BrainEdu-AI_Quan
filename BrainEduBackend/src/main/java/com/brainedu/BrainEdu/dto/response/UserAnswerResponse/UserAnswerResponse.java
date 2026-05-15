package com.brainedu.BrainEdu.dto.response.UserAnswerResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserAnswerResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long questionId;

    private String questionText;

    private Long selectedAnswerId;

    private String selectedAnswerText;

    private Boolean isCorrect;

    private Integer responseTime;

    private LocalDateTime submittedAt;
}