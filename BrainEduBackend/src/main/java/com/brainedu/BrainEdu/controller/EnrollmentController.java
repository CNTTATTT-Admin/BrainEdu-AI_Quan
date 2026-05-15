package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.EnrollmentRequest.*;
import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.*;
import com.brainedu.BrainEdu.service.enrollmentService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService
            enrollmentService;

    @PostMapping
    public EnrollmentResponse enroll(
            @RequestBody
            EnrollmentRequest request
    ) {

        return enrollmentService.enroll(
                request
        );
    }

    @GetMapping("/me")
    public List<EnrollmentResponse> myCourses() {

        return enrollmentService.myCourses();
    }

    @GetMapping("/{id}")
    public EnrollmentResponse getById(
            @PathVariable Long id
    ) {

        return enrollmentService.getById(
                id
        );
    }

    @DeleteMapping("/{id}")
    public String cancel(
            @PathVariable Long id
    ) {

        return enrollmentService.cancel(
                id
        );
    }
}