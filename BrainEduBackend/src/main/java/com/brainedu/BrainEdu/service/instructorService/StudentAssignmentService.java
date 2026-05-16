package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentSubmissionResponse;

import java.util.List;

public interface StudentAssignmentService {

    AssignmentSubmissionResponse
    submitAssignment(
            SubmitAssignmentRequest request
    );

    List<AssignmentSubmissionResponse>
    getMySubmissions();
}