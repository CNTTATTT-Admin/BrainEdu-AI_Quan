package com.brainedu.BrainEdu.dto.request.CourseRequest;

import lombok.Data;

@Data
public class CourseRequest {

    private Long categoryId;

    private String title;

    private String description;

    private String level;

    private Integer estimatedDuration;

    private String thumbnail;

    private Float difficultyScore;
}