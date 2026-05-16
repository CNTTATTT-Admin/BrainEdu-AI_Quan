package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.*;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public AssignmentResponse createAssignment(
            @RequestBody
            CreateAssignmentRequest request
    ) {

        return assignmentService
                .createAssignment(request);
    }

    @GetMapping
    public List<AssignmentResponse>
    getMyAssignments() {

        return assignmentService
                .getMyAssignments();
    }

    @GetMapping("/{id}/submissions")
    public List<AssignmentSubmissionResponse>
    getSubmissions(
            @PathVariable Long id
    ) {

        return assignmentService
                .getSubmissions(id);
    }

    @PutMapping(
            "/submissions/{id}/grade"
    )
    public AssignmentSubmissionResponse
    gradeSubmission(
            @PathVariable Long id,

            @RequestBody
            GradeSubmissionRequest request
    ) {

        return assignmentService
                .gradeSubmission(
                        id,
                        request
                );
    }
}