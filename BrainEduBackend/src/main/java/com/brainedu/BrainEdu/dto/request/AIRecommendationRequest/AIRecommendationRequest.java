package com.brainedu.BrainEdu.dto.request.AIRecommendationRequest;

import lombok.Data;

@Data
public class AIRecommendationRequest {

    private Long userId;

    private String recommendationType;

    private Long targetId;

    private Float score;

    private String reason;
}