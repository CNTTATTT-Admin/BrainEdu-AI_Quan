package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.service.courseService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService
            courseService;

    @PostMapping
    public CourseResponse create(
            @RequestBody
            CourseRequest request
    ) {

        return courseService.create(
                request
        );
    }

    @GetMapping
    public List<CourseResponse> getAll() {

        return courseService.getAll();
    }

    @GetMapping("/{id}")
    public CourseResponse getById(
            @PathVariable Long id
    ) {

        return courseService.getById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<CourseResponse> getByCategory(
            @PathVariable Long categoryId
    ) {

        return courseService.getByCategory(
                categoryId
        );
    }

    @PutMapping("/{id}")
    public CourseResponse update(
            @PathVariable Long id,
            @RequestBody CourseRequest request
    ) {

        return courseService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return courseService.delete(id);
    }
}