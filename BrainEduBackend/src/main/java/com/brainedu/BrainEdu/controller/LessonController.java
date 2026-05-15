package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.LessonRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonResponse.*;
import com.brainedu.BrainEdu.service.lessonService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService
            lessonService;

    @PostMapping
    public LessonResponse create(
            @RequestBody
            LessonRequest request
    ) {

        return lessonService.create(
                request
        );
    }

    @GetMapping("/course/{courseId}")
    public List<LessonResponse> getByCourse(
            @PathVariable Long courseId
    ) {

        return lessonService.getByCourse(
                courseId
        );
    }

    @GetMapping("/{id}")
    public LessonResponse getById(
            @PathVariable Long id
    ) {

        return lessonService.getById(id);
    }

    @PutMapping("/{id}")
    public LessonResponse update(
            @PathVariable Long id,
            @RequestBody LessonRequest request
    ) {

        return lessonService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return lessonService.delete(id);
    }
}