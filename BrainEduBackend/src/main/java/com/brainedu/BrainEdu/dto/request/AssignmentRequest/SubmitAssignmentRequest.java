package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class SubmitAssignmentRequest {
    @NotNull
    @Positive
    private Long assignmentId;

    @NotBlank
    private String textAnswer;

    private String fileUrl;
}