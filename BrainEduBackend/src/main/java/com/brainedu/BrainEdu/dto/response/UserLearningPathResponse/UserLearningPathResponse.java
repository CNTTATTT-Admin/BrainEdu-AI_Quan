package com.brainedu.BrainEdu.dto.response.UserLearningPathResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserLearningPathResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long courseId;

    private String courseTitle;

    private Long roadmapId;

    private String roadmapName;

    private Float recommendationScore;

    private String status;

    private String recommendedReason;

    private Boolean aiGenerated;

    private LocalDateTime createdAt;
}