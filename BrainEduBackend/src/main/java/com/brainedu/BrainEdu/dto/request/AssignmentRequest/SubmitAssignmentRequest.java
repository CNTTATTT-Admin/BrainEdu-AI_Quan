package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import lombok.Data;

@Data
public class SubmitAssignmentRequest {

    private String answerText;

    private String attachmentUrl;
}