package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class GradeSubmissionRequest {

    @NotNull
    private Float score;

    private String feedback;
}