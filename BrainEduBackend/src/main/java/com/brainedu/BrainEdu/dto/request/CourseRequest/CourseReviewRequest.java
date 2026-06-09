package com.brainedu.BrainEdu.dto.request.CourseRequest;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CourseReviewRequest {

    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;

    private String comment;
}