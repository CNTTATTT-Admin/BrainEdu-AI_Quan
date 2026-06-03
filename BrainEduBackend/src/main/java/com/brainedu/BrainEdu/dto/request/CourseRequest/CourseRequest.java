package com.brainedu.BrainEdu.dto.request.CourseRequest;

import com.brainedu.BrainEdu.common.enums.CourseType;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CourseRequest {
    @NotNull
    @Positive
    private Long categoryId;

    @NotBlank
    @Size(max = 255)
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Positive
    private Long instructorId;

    private String level;

    private Integer estimatedDuration;

    private String thumbnail;

    private Float difficultyScore;

    private Float price;

    private CourseType courseType;
}