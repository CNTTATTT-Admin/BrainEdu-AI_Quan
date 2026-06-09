package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignMoreStudentsRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentRecipientResponse;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.service.assignmentService.AssignmentRecipientService;
import com.brainedu.BrainEdu.service.assignmentService.AssignmentService;

import jakarta.validation.Valid;
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

    @PostMapping("/assign-more")
        public ApiResponse<Void> assignMore(
                @Valid @RequestBody AssignMoreStudentsRequest request
        ) {
        service.assignMoreStudents(request);
        return ResponseFactory.success("Gán thêm học sinh vào bài tập thành công", null);
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