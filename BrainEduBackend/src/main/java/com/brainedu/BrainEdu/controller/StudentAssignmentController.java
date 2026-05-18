package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentSubmissionResponse;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

        return ResponseFactory.success(
                "Assignment submitted successfully",
                assignmentService.submitAssignment(
                        request
                )
        );
    }

    @GetMapping("/my-submissions")
    public ApiResponse<List<AssignmentSubmissionResponse>>
    getMySubmissions(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<AssignmentSubmissionResponse> submissions =
                assignmentService.getMySubmissions(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        submissions
                );

        return ResponseFactory.success(
                "Student submissions fetched successfully",
                submissions.getContent(),
                meta
        );
    }
}