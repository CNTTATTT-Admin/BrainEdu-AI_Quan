package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import lombok.Data;

@Data
public class GradeSubmissionRequest {

    private Float score;

    private String feedback;
}