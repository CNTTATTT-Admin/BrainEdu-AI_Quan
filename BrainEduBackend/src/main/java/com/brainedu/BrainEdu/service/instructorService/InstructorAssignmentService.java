package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.CreateAssignmentRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentSubmissionResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface InstructorAssignmentService {

    AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    );

    Page<AssignmentResponse> getMyAssignments(int page, int size);

    Page<AssignmentSubmissionResponse>
    getSubmissions(Long assignmentId, int page, int size);

    AssignmentSubmissionResponse
    gradeSubmission(
            Long submissionId,
            GradeSubmissionRequest request
    );
}