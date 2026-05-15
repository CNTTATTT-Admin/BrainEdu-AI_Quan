package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.QuizRequest.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.*;
import com.brainedu.BrainEdu.service.quizService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService
            quizService;

    @PostMapping
    public QuizResponse create(
            @RequestBody
            QuizRequest request
    ) {

        return quizService.create(
                request
        );
    }

    @GetMapping
    public List<QuizResponse> getAll() {

        return quizService.getAll();
    }

    @GetMapping("/{id}")
    public QuizResponse getById(
            @PathVariable Long id
    ) {

        return quizService.getById(id);
    }

    @GetMapping("/lesson/{lessonId}")
    public List<QuizResponse> getByLesson(
            @PathVariable Long lessonId
    ) {

        return quizService.getByLesson(
                lessonId
        );
    }

    @PutMapping("/{id}")
    public QuizResponse update(
            @PathVariable Long id,
            @RequestBody QuizRequest request
    ) {

        return quizService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return quizService.delete(id);
    }
}