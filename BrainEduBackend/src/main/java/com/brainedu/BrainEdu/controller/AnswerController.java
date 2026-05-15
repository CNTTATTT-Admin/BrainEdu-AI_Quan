package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.AnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.AnswerResponse.*;
import com.brainedu.BrainEdu.service.answerService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService
            answerService;

    @PostMapping
    public AnswerResponse create(
            @RequestBody
            AnswerRequest request
    ) {

        return answerService.create(
                request
        );
    }

    @GetMapping
    public List<AnswerResponse> getAll() {

        return answerService.getAll();
    }

    @GetMapping("/{id}")
    public AnswerResponse getById(
            @PathVariable Long id
    ) {

        return answerService.getById(id);
    }

    @GetMapping("/question/{questionId}")
    public List<AnswerResponse> getByQuestion(
            @PathVariable Long questionId
    ) {

        return answerService.getByQuestion(
                questionId
        );
    }

    @PutMapping("/{id}")
    public AnswerResponse update(
            @PathVariable Long id,
            @RequestBody AnswerRequest request
    ) {

        return answerService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return answerService.delete(id);
    }
}