package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.CourseRequest.CourseRequest;
import com.brainedu.BrainEdu.dto.request.CourseRequest.CreateCourseRequest;
import com.brainedu.BrainEdu.dto.response.CourseResponse.CourseResponse;
import com.brainedu.BrainEdu.dto.response.CourseResponse.MyCourseResponse;
import com.brainedu.BrainEdu.service.courseService.CourseService;
import com.brainedu.BrainEdu.service.enrollmentService.EnrollmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService
            courseService;

    @PostMapping
    public ApiResponse<CourseResponse>
    create(
            @Valid
            @RequestBody
            CreateCourseRequest request
    ) {

        return ResponseFactory.success(
                "Course created successfully",
                courseService.create(request)
        );
    }

    @GetMapping
    public ApiResponse<List<CourseResponse>>
    getAll(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<CourseResponse> courses =
                courseService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        courses
                );

        return ResponseFactory.success(
                "Courses fetched successfully",
                courses.getContent(),
                meta
        );
    }

    @GetMapping("/{id:\\d+}")
    public ApiResponse<CourseResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Course fetched successfully",
                courseService.getById(id)
        );
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<CourseResponse>>
    getByCategory(

            @PathVariable Long categoryId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<CourseResponse> courses =
                courseService.getByCategory(
                        categoryId,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        courses
                );

        return ResponseFactory.success(
                "Courses by category fetched successfully",
                courses.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<CourseResponse>
    update(
            @Valid
            @PathVariable Long id,
            @RequestBody
            CourseRequest request
    ) {

        return ResponseFactory.success(
                "Course updated successfully",
                courseService.update(
                        id,
                        request
                )
        );
    }

    @GetMapping("/my-courses")
        public ApiResponse<List<MyCourseResponse>>
        getMyCourses() {

        return ResponseFactory.success(
                "My enrolled courses",
                courseService.getMyCourses()
        );
        }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Course deleted successfully",
                courseService.delete(id)
        );
    }
}
