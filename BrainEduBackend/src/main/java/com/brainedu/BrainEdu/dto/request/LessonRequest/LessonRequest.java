package com.brainedu.BrainEdu.dto.request.LessonRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class LessonRequest {

    @NotNull
    @Positive
    private Long courseId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @URL
    private String videoUrl;

    @NotNull
    @PositiveOrZero
    private Integer lessonOrder;

    @NotNull
    @Positive
    private Integer estimatedTime;

    private String difficulty;
}