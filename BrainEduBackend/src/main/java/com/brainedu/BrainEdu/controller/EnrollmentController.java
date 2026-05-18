package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.EnrollmentRequest.EnrollmentRequest;
import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.EnrollmentResponse;
import com.brainedu.BrainEdu.service.enrollmentService.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService
            enrollmentService;

    @PostMapping
    public ApiResponse<EnrollmentResponse>
    enroll(
            @RequestBody
            EnrollmentRequest request
    ) {

        return ResponseFactory.success(
                "Enrollment created successfully",
                enrollmentService.enroll(
                        request
                )
        );
    }

    @GetMapping("/me")
    public ApiResponse<List<EnrollmentResponse>>
    myCourses() {

        return ResponseFactory.success(
                "My enrolled courses fetched successfully",
                enrollmentService.myCourses()
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<EnrollmentResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Enrollment fetched successfully",
                enrollmentService.getById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    cancel(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Enrollment cancelled successfully",
                enrollmentService.cancel(id)
        );
    }
}