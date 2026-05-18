package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.LessonRequest.LessonRequest;
import com.brainedu.BrainEdu.dto.response.LessonResponse.LessonResponse;
import com.brainedu.BrainEdu.service.lessonService.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

        return ResponseFactory.success(
                "Lesson created successfully",
                lessonService.create(
                        request
                )
        );
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<List<LessonResponse>>
    getByCourse(

            @PathVariable Long courseId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<LessonResponse> lessons =
                lessonService.getByCourse(
                        courseId,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        lessons
                );

        return ResponseFactory.success(
                "Lessons fetched successfully",
                lessons.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<LessonResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Lesson fetched successfully",
                lessonService.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<LessonResponse>
    update(

            @PathVariable Long id,

            @RequestBody
            LessonRequest request
    ) {

        return ResponseFactory.success(
                "Lesson updated successfully",
                lessonService.update(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Lesson deleted successfully",
                lessonService.delete(id)
        );
    }
}