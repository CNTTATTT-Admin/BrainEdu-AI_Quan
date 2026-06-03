package com.brainedu.BrainEdu.controller;
import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.service.assignmentService.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService service;

    @PostMapping
    public ApiResponse<AssignmentResponse>
    create(
            @RequestBody
            @Valid
            AssignmentRequest request
    ) {
        return ResponseFactory.success(
                "Assignment created",
                service.create(request)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<AssignmentResponse>
    getById(
            @PathVariable Long id
    ) {
        return ResponseFactory.success(
                "Success",
                service.getById(id)
        );
    }

    @GetMapping("/my")
    public ApiResponse<List<AssignmentResponse>>
    myAssignments() {

        return ResponseFactory.success(
                "Success",
                service.getMyAssignments()
        );
    }

    @PutMapping("/{id}/publish")
    public ApiResponse<Void>
    publish(
            @PathVariable Long id
    ) {

        service.publish(id);

        return ResponseFactory.success(
                "Published",
                null
        );
    }

    @PutMapping("/{id}/close")
    public ApiResponse<Void>
    close(
            @PathVariable Long id
    ) {

        service.close(id);

        return ResponseFactory.success(
                "Closed",
                null
        );
    }
}