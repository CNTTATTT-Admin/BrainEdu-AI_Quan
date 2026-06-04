package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SubmissionService {

    SubmissionResponse submit(
            Long assignmentId,
            String answerText,
            MultipartFile file
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