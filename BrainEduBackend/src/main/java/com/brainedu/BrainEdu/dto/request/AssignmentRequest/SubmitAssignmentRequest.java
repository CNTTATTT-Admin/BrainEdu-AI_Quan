package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import lombok.Data;

@Data
public class SubmitAssignmentRequest {

    private Long assignmentId;

    private String textAnswer;

    private String fileUrl;
}