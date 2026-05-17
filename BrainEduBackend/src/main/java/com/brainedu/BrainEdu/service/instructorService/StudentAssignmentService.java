package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentSubmissionResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudentAssignmentService {

    AssignmentSubmissionResponse
    submitAssignment(
            SubmitAssignmentRequest request
    );

    Page<AssignmentSubmissionResponse>
    getMySubmissions(int page, int size);
}