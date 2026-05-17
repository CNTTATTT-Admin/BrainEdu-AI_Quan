package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.LessonRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonResponse.*;
import com.brainedu.BrainEdu.service.lessonService.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService
            lessonService;

    @PostMapping
    public ApiResponse<LessonResponse>
    create(
            @RequestBody
            LessonRequest request
    ) {

        return ApiResponse
                .<LessonResponse>builder()

                .success(true)

                .message(
                        "Lesson created successfully"
                )

                .data(
                        lessonService.create(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<List<LessonResponse>>
    getByCourse(
            @PathVariable Long courseId
    ) {

        return ApiResponse
                .<List<LessonResponse>>builder()

                .success(true)

                .message(
                        "Lessons fetched successfully"
                )

                .data(
                        lessonService.getByCourse(
                                courseId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<LessonResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<LessonResponse>builder()

                .success(true)

                .message(
                        "Lesson fetched successfully"
                )

                .data(
                        lessonService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<LessonResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            LessonRequest request
    ) {

        return ApiResponse
                .<LessonResponse>builder()

                .success(true)

                .message(
                        "Lesson updated successfully"
                )

                .data(
                        lessonService.update(
                                id,
                                request
                        )
                )

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
                        "Lesson deleted successfully"
                )

                .data(
                        lessonService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}