package com.brainedu.BrainEdu.dto.request.CourseRequest;

import com.brainedu.BrainEdu.common.enums.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
    private CourseType courseType;

    @NotNull
    @PositiveOrZero
    private Float price;
}