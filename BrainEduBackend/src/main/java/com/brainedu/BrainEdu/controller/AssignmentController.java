package com.brainedu.BrainEdu.controller;
import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.dto.response.CourseResponse.CourseResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.EnrolledStudentResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.service.assignmentService.AssignmentService;
import com.brainedu.BrainEdu.service.instructorService.InstructorCourseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService service;

    private final InstructorCourseService instructorCourseService;

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

    @GetMapping("/instructor/courses")
        public ApiResponse<List<CourseResponse>> getMyCourses() {
        return ResponseFactory.success(
                "Get instructor courses successfully",
                instructorCourseService.getMyCourses()
        );
        }

        @GetMapping("/courses/{courseId}/students")
        public ApiResponse<List<EnrolledStudentResponse>> getStudentsEnrolledInCourse(
                @PathVariable Long courseId
        ) {
        return ResponseFactory.success(
                "Get enrolled students successfully",
                instructorCourseService.getStudentsEnrolledInCourse(courseId)
        );
        }

        @GetMapping("/instructor/course/{courseId}")
        public ResponseEntity<ApiResponse<List<AssignmentResponse>>> getByCourseForInstructor(
                @PathVariable Long courseId
        ) {
                List<AssignmentResponse> assignments = service.getByCourseForInstructor(courseId);
                
                return ResponseEntity.ok(
                        ResponseFactory.success(
                                "Instructor assignments fetched successfully",
                                assignments
                        )
                );
        }

        @GetMapping("/course/{courseId}/assignments/{assignmentId}/unassigned-students")
        public ResponseEntity<ApiResponse<List<UserResponse>>> getUnassignedStudents(
                @PathVariable Long courseId,
                @PathVariable Long assignmentId
        ) {
                List<UserResponse> students = service.getUnassignedStudentsByCourseAndInstructor(
                        courseId, 
                        assignmentId
                );
                
                return ResponseEntity.ok(
                        ResponseFactory.success(
                                "Unassigned instructor course students fetched successfully",
                                students
                        )
                );
        }

    
}