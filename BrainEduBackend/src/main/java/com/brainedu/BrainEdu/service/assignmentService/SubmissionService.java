package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;

import java.util.List;

public interface SubmissionService {

    SubmissionResponse submit(
            Long assignmentId,
            SubmitAssignmentRequest request
    );

    SubmissionResponse grade(
            Long submissionId,
            GradeSubmissionRequest request
    );

    List<SubmissionResponse>
    getByAssignment(
            Long assignmentId
    );

    List<SubmissionResponse>
    mySubmissions();
}