package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAssignmentRequest {

    @NotNull
    @Positive
    private Long courseId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private LocalDateTime dueDate;

    @NotNull
    @Positive
    private Double maxScore;
}