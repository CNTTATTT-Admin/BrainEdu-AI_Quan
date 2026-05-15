package com.brainedu.BrainEdu.service.enrollmentService;

import com.brainedu.BrainEdu.dto.request.EnrollmentRequest.*;
import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.*;

import java.util.List;

public interface EnrollmentService {

    EnrollmentResponse enroll(
            EnrollmentRequest request
    );

    List<EnrollmentResponse> myCourses();

    EnrollmentResponse getById(
            Long id
    );

    String cancel(
            Long id
    );
}