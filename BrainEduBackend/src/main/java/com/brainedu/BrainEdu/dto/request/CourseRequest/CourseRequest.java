package com.brainedu.BrainEdu.dto.request.CourseRequest;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CourseRequest {
    @NotBlank
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
}