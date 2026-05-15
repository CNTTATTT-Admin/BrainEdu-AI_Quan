package com.brainedu.BrainEdu.dto.request.RoadmapRequest;

import lombok.Data;

@Data
public class RoadmapRequest {

    private Long categoryId;

    private String roadmapName;

    private String level;

    private String description;
}