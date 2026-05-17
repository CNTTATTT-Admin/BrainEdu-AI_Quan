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
@RequestMapping(
        "/api/v1/instructor/assignments"
)
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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<
            List<AssignmentResponse>
            > getMyAssignments() {

        return ApiResponse
                .<List<AssignmentResponse>>
                        builder()

                .success(true)

                .message(
                        "Assignments fetched successfully"
                )

                .data(
                        assignmentService
                                .getMyAssignments()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}/submissions")
    public ApiResponse<
            List<AssignmentSubmissionResponse>
            > getSubmissions(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<List<
                        AssignmentSubmissionResponse
                        >>builder()

                .success(true)

                .message(
                        "Assignment submissions fetched successfully"
                )

                .data(
                        assignmentService
                                .getSubmissions(id)
                )

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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}