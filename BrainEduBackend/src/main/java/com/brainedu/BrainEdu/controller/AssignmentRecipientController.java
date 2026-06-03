package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentRecipientResponse;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.service.assignmentService.AssignmentRecipientService;
import com.brainedu.BrainEdu.service.assignmentService.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        "/api/v1/assignment-recipients"
)
@RequiredArgsConstructor
public class AssignmentRecipientController {

    private final
    AssignmentRecipientService service;

    private final
    AssignmentService assignmentService;

    @GetMapping(
            "/assignment/{assignmentId}"
    )
    public ApiResponse<
                List<
                                    AssignmentRecipientResponse
                                    >
                >
    getStudents(
            @PathVariable Long assignmentId
    ) {

        return ResponseFactory.success(
                "Success",
                service.getStudents(
                        assignmentId
                )
        );
    }

    @GetMapping("/my")
    public ApiResponse<List<AssignmentResponse>>
    getMyAssignments() {

        return ResponseFactory.success(
                "My assignments",
                assignmentService.getMyAssignments()
        );
    }
}