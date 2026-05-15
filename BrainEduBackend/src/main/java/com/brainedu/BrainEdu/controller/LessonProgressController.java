package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.LessonProgressRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.*;
import com.brainedu.BrainEdu.service.lessonProgressService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public LessonProgressResponse saveProgress(
            @RequestBody
            LessonProgressRequest request
    ) {

        return lessonProgressService
                .saveProgress(request);
    }

    @GetMapping("/me")
    public List<LessonProgressResponse>
    myProgress() {

        return lessonProgressService
                .myProgress();
    }

    @GetMapping("/{lessonId}")
    public LessonProgressResponse getByLesson(
            @PathVariable Long lessonId
    ) {

        return lessonProgressService
                .getByLesson(lessonId);
    }
}