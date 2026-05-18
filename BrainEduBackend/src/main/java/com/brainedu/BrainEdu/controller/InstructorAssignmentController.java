package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.CreateAssignmentRequest;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.GradeSubmissionRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentSubmissionResponse;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

        return ResponseFactory.success(
                "Assignment created successfully",
                assignmentService.createAssignment(
                        request
                )
        );
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
                assignmentService.getMyAssignments(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        assignments
                );

        return ResponseFactory.success(
                "Assignments fetched successfully",
                assignments.getContent(),
                meta
        );
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
                assignmentService.getSubmissions(
                        id,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        submissions
                );

        return ResponseFactory.success(
                "Assignment submissions fetched successfully",
                submissions.getContent(),
                meta
        );
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

        return ResponseFactory.success(
                "Submission graded successfully",
                assignmentService.gradeSubmission(
                        id,
                        request
                )
        );
    }
}