package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.CourseRequest.CourseRequest;
import com.brainedu.BrainEdu.dto.response.CourseResponse.CourseResponse;
import com.brainedu.BrainEdu.service.courseService.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
            @RequestBody
            CourseRequest request
    ) {

        return ApiResponse
                .<CourseResponse>builder()

                .success(true)

                .message(
                        "Course created successfully"
                )

                .data(
                        courseService.create(
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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
                PaginationMeta.builder()

                        .page(
                                courses.getNumber()
                        )

                        .size(
                                courses.getSize()
                        )

                        .totalElements(
                                courses.getTotalElements()
                        )

                        .totalPages(
                                courses.getTotalPages()
                        )

                        .hasNext(
                                courses.hasNext()
                        )

                        .hasPrevious(
                                courses.hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<CourseResponse>>builder()

                .success(true)

                .message(
                        "Courses fetched successfully"
                )

                .data(
                        courses.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<CourseResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<CourseResponse>builder()

                .success(true)

                .message(
                        "Course fetched successfully"
                )

                .data(
                        courseService.getById(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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
                PaginationMeta.builder()

                        .page(
                                courses.getNumber()
                        )

                        .size(
                                courses.getSize()
                        )

                        .totalElements(
                                courses.getTotalElements()
                        )

                        .totalPages(
                                courses.getTotalPages()
                        )

                        .hasNext(
                                courses.hasNext()
                        )

                        .hasPrevious(
                                courses.hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<CourseResponse>>builder()

                .success(true)

                .message(
                        "Courses by category fetched successfully"
                )

                .data(
                        courses.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<CourseResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            CourseRequest request
    ) {

        return ApiResponse
                .<CourseResponse>builder()

                .success(true)

                .message(
                        "Course updated successfully"
                )

                .data(
                        courseService.update(
                                id,
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Course deleted successfully"
                )

                .data(
                        courseService.delete(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}