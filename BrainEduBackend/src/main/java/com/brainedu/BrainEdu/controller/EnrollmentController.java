package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.EnrollmentRequest.*;
import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.*;
import com.brainedu.BrainEdu.service.enrollmentService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

        return ApiResponse
                .<EnrollmentResponse>builder()

                .success(true)

                .message(
                        "Enrollment created successfully"
                )

                .data(
                        enrollmentService.enroll(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/me")
    public ApiResponse<List<EnrollmentResponse>>
    myCourses() {

        return ApiResponse
                .<List<EnrollmentResponse>>builder()

                .success(true)

                .message(
                        "My enrolled courses fetched successfully"
                )

                .data(
                        enrollmentService.myCourses()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<EnrollmentResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<EnrollmentResponse>builder()

                .success(true)

                .message(
                        "Enrollment fetched successfully"
                )

                .data(
                        enrollmentService.getById(
                                id
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    cancel(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Enrollment cancelled successfully"
                )

                .data(
                        enrollmentService.cancel(
                                id
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}