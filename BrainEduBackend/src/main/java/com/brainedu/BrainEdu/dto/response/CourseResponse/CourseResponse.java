package com.brainedu.BrainEdu.dto.response.CourseResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

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

    private Long instructorId;

    private String instructorName;

    private Float price;

    private boolean isEnrolled;

    private String courseType;

    private LocalDateTime createdAt;

    private Long totalEnrolled;

    private Long totalLessons;
}