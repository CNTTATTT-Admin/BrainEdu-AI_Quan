package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.LessonProgressRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.*;
import com.brainedu.BrainEdu.service.lessonProgressService.LessonProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(
        "/api/v1/lesson-progress"
)
@RequiredArgsConstructor
public class LessonProgressController {

    private final LessonProgressService
            lessonProgressService;

    @PostMapping
    public ApiResponse<LessonProgressResponse>
    saveProgress(
            @RequestBody
            LessonProgressRequest request
    ) {

        return ApiResponse
                .<LessonProgressResponse>builder()

                .success(true)

                .message(
                        "Lesson progress saved successfully"
                )

                .data(
                        lessonProgressService
                                .saveProgress(request)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/me")
    public ApiResponse<
            List<LessonProgressResponse>
            > myProgress() {

        return ApiResponse
                .<List<LessonProgressResponse>>
                        builder()

                .success(true)

                .message(
                        "Lesson progress fetched successfully"
                )

                .data(
                        lessonProgressService
                                .myProgress()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{lessonId}")
    public ApiResponse<LessonProgressResponse>
    getByLesson(
            @PathVariable Long lessonId
    ) {

        return ApiResponse
                .<LessonProgressResponse>builder()

                .success(true)

                .message(
                        "Lesson progress fetched successfully"
                )

                .data(
                        lessonProgressService
                                .getByLesson(
                                        lessonId
                                )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}