package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.*;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/student-assignments")
@RequiredArgsConstructor
public class StudentAssignmentController {

    private final StudentAssignmentService
            assignmentService;

    @PostMapping("/submit")
    public ApiResponse<AssignmentSubmissionResponse>
    submitAssignment(
            @RequestBody
            SubmitAssignmentRequest request
    ) {

        return ApiResponse
                .<AssignmentSubmissionResponse>builder()

                .success(true)

                .message(
                        "Assignment submitted successfully"
                )

                .data(
                        assignmentService
                                .submitAssignment(
                                        request
                                )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/my-submissions")
    public ApiResponse<List<AssignmentSubmissionResponse>>
    getMySubmissions() {

        return ApiResponse
                .<List<AssignmentSubmissionResponse>>builder()

                .success(true)

                .message(
                        "Student submissions fetched successfully"
                )

                .data(
                        assignmentService
                                .getMySubmissions()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}