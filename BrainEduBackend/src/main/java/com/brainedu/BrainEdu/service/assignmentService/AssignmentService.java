package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.entity.User;

import java.util.List;

public interface AssignmentService {

    AssignmentResponse create(
            AssignmentRequest request
    );

    AssignmentResponse getById(
            Long id
    );

    List<AssignmentResponse>
    getByCourse(Long courseId);

    List<AssignmentResponse>
    getMyAssignments();

    void publish(Long id);

    void close(Long id);

    void delete(Long id);

    List<AssignmentResponse> getByCourseForInstructor(Long courseId);

    List<UserResponse> getUnassignedStudentsByCourseAndInstructor(Long courseId, Long assignmentId);

}