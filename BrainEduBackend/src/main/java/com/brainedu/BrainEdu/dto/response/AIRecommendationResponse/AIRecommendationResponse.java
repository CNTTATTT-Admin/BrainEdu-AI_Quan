package com.brainedu.BrainEdu.dto.response.AIRecommendationResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AIRecommendationResponse {

    private Long id;

    private Long userId;

    private String userName;

    private String recommendationType;

    private Long targetId;

    private Float score;

    private String reason;

    private LocalDateTime createdAt;
}