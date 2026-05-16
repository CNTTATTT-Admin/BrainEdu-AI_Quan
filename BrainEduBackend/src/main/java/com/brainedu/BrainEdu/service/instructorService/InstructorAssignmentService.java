package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.CreateAssignmentRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentSubmissionResponse;

import java.util.List;

public interface InstructorAssignmentService {

    AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    );

    List<AssignmentResponse> getMyAssignments();

    List<AssignmentSubmissionResponse>
    getSubmissions(Long assignmentId);

    AssignmentSubmissionResponse
    gradeSubmission(
            Long submissionId,
            GradeSubmissionRequest request
    );
}