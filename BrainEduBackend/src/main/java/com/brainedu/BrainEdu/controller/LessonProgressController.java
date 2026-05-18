package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.LessonProgressRequest.LessonProgressRequest;
import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.LessonProgressResponse;
import com.brainedu.BrainEdu.service.lessonProgressService.LessonProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lesson-progress")
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

        return ResponseFactory.success(
                "Lesson progress saved successfully",
                lessonProgressService.saveProgress(
                        request
                )
        );
    }

    @GetMapping("/me")
    public ApiResponse<
            List<LessonProgressResponse>
            > myProgress() {

        return ResponseFactory.success(
                "Lesson progress fetched successfully",
                lessonProgressService.myProgress()
        );
    }

    @GetMapping("/{lessonId}")
    public ApiResponse<LessonProgressResponse>
    getByLesson(
            @PathVariable Long lessonId
    ) {

        return ResponseFactory.success(
                "Lesson progress fetched successfully",
                lessonProgressService.getByLesson(
                        lessonId
                )
        );
    }
}