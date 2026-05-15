package com.brainedu.BrainEdu.dto.request.UserLearningPathRequest;

import lombok.Data;

@Data
public class UserLearningPathRequest {

    private Long userId;

    private Long courseId;

    private Long roadmapId;

    private Float recommendationScore;

    private String status;

    private String recommendedReason;

    private Boolean aiGenerated;
}