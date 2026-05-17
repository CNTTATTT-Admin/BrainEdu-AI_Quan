package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.*;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
                PaginationMeta.builder()

                        .page(
                                submissions.getNumber()
                        )

                        .size(
                                submissions.getSize()
                        )

                        .totalElements(
                                submissions
                                        .getTotalElements()
                        )

                        .totalPages(
                                submissions
                                        .getTotalPages()
                        )

                        .hasNext(
                                submissions.hasNext()
                        )

                        .hasPrevious(
                                submissions
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<AssignmentSubmissionResponse>>
                        builder()

                .success(true)

                .message(
                        "Student submissions fetched successfully"
                )

                .data(
                        submissions.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}