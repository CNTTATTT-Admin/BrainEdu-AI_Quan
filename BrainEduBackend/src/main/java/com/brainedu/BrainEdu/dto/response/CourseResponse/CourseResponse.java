package com.brainedu.BrainEdu.dto.response.CourseResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private String title;

    private String description;

    private String level;

    private Integer estimatedDuration;

    private String thumbnail;

    private Float difficultyScore;

    private Long createdById;

    private String createdByName;
}