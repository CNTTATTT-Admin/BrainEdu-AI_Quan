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
@RequestMapping("/api/v1/instructor/assignments")
@RequiredArgsConstructor
public class InstructorAssignmentController {

    private final InstructorAssignmentService
            assignmentService;

    @PostMapping
    public ApiResponse<AssignmentResponse>
    createAssignment(
            @RequestBody
            CreateAssignmentRequest request
    ) {

        return ApiResponse
                .<AssignmentResponse>builder()

                .success(true)

                .message(
                        "Assignment created successfully"
                )

                .data(
                        assignmentService
                                .createAssignment(
                                        request
                                )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<AssignmentResponse>>
    getMyAssignments(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<AssignmentResponse> assignments =
                assignmentService
                        .getMyAssignments(
                                page,
                                size
                        );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                assignments.getNumber()
                        )

                        .size(
                                assignments.getSize()
                        )

                        .totalElements(
                                assignments
                                        .getTotalElements()
                        )

                        .totalPages(
                                assignments
                                        .getTotalPages()
                        )

                        .hasNext(
                                assignments.hasNext()
                        )

                        .hasPrevious(
                                assignments
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<AssignmentResponse>>
                        builder()

                .success(true)

                .message(
                        "Assignments fetched successfully"
                )

                .data(
                        assignments.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}/submissions")
    public ApiResponse<
            List<AssignmentSubmissionResponse>
            > getSubmissions(

            @PathVariable Long id,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<AssignmentSubmissionResponse>
                submissions =
                assignmentService
                        .getSubmissions(
                                id,
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
                .<List<
                        AssignmentSubmissionResponse
                        >>builder()

                .success(true)

                .message(
                        "Assignment submissions fetched successfully"
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

    @PutMapping(
            "/submissions/{id}/grade"
    )
    public ApiResponse<
            AssignmentSubmissionResponse
            > gradeSubmission(

            @PathVariable Long id,

            @RequestBody
            GradeSubmissionRequest request
    ) {

        return ApiResponse
                .<AssignmentSubmissionResponse>
                        builder()

                .success(true)

                .message(
                        "Submission graded successfully"
                )

                .data(
                        assignmentService
                                .gradeSubmission(
                                        id,
                                        request
                                )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}