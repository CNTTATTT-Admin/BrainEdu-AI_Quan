        package com.brainedu.BrainEdu.dto.request.CourseRequest;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateCourseRequest {

    @NotNull
    @Positive
    private Long categoryId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String level;

    @NotNull
    @Positive
    private Integer estimatedDuration;

    @NotBlank
    private String thumbnail;

    @NotNull
    @Positive
    private Float difficultyScore;

    @NotNull
    @PositiveOrZero
    private Float price;
}
