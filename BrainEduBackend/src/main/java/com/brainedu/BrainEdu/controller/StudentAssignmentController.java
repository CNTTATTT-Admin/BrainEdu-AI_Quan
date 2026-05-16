package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.*;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.*;
import com.brainedu.BrainEdu.service.instructorService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        "/api/v1/student/assignments"
)
@RequiredArgsConstructor
public class StudentAssignmentController {

    private final StudentAssignmentService
            assignmentService;

    @PostMapping("/submit")
    public AssignmentSubmissionResponse
    submitAssignment(
            @RequestBody
            SubmitAssignmentRequest request
    ) {

        return assignmentService
                .submitAssignment(request);
    }

    @GetMapping("/my-submissions")
    public List<AssignmentSubmissionResponse>
    getMySubmissions() {

        return assignmentService
                .getMySubmissions();
    }
}