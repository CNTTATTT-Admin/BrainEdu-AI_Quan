package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignMoreStudentsRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentRecipientResponse;

import java.util.List;

public interface AssignmentRecipientService {

    List<AssignmentRecipientResponse>
    getStudents(
            Long assignmentId
    );
    void assignMoreStudents(AssignMoreStudentsRequest request);
}