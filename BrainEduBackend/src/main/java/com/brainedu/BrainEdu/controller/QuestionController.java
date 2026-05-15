package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.QuestionRequest.*;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.*;
import com.brainedu.BrainEdu.service.questionService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService
            questionService;

    @PostMapping
    public QuestionResponse create(
            @RequestBody
            QuestionRequest request
    ) {

        return questionService.create(
                request
        );
    }

    @GetMapping
    public List<QuestionResponse> getAll() {

        return questionService.getAll();
    }

    @GetMapping("/{id}")
    public QuestionResponse getById(
            @PathVariable Long id
    ) {

        return questionService.getById(id);
    }

    @GetMapping("/quiz/{quizId}")
    public List<QuestionResponse> getByQuiz(
            @PathVariable Long quizId
    ) {

        return questionService.getByQuiz(
                quizId
        );
    }

    @GetMapping("/skill/{skillId}")
    public List<QuestionResponse> getBySkill(
            @PathVariable Long skillId
    ) {

        return questionService.getBySkill(
                skillId
        );
    }

    @PutMapping("/{id}")
    public QuestionResponse update(
            @PathVariable Long id,
            @RequestBody QuestionRequest request
    ) {

        return questionService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return questionService.delete(id);
    }
}