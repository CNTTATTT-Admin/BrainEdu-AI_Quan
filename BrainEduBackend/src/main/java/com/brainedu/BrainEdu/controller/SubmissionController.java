package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.SubmitAssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;
import com.brainedu.BrainEdu.service.assignmentService.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService service;

    @PostMapping(
            value = "/assignment/{assignmentId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<SubmissionResponse> submit(
            @PathVariable Long assignmentId,
            @RequestParam(required = false) String answerText,
            @RequestPart(required = false) MultipartFile file
    ) {
        return ResponseFactory.success(
                "Submitted",
                service.submit(assignmentId, answerText, file)
        );
    }

    @PostMapping(
            "/{submissionId}/grade"
    )
    public ApiResponse<SubmissionResponse>
    grade(
            @PathVariable Long submissionId,
            @RequestBody
            GradeSubmissionRequest request
    ) {

        return ResponseFactory.success(
                "Graded",
                service.grade(
                        submissionId,
                        request
                )
        );
    }

    @GetMapping(
            "/assignment/{assignmentId}"
    )
    public ApiResponse<
            List<SubmissionResponse>
            >
    getByAssignment(
            @PathVariable Long assignmentId
    ) {

        return ResponseFactory.success(
                "Success",
                service.getByAssignment(
                        assignmentId
                )
        );
    }

    @GetMapping("/my")
    public ApiResponse<
            List<SubmissionResponse>
            >
    mySubmissions() {

        return ResponseFactory.success(
                "Success",
                service.mySubmissions()
        );
    }
}