package com.brainedu.BrainEdu.dto.response.RoadmapResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoadmapResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private String roadmapName;

    private String level;

    private String description;
}