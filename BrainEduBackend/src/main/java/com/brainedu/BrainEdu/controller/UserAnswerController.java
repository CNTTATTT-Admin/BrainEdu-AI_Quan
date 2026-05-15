package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.UserAnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.*;
import com.brainedu.BrainEdu.service.userAnswerService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-answers")
@RequiredArgsConstructor
public class UserAnswerController {

    private final UserAnswerService
            userAnswerService;

    @PostMapping
    public UserAnswerResponse submit(
            @RequestBody
            UserAnswerRequest request
    ) {

        return userAnswerService.submit(
                request
        );
    }

    @GetMapping
    public List<UserAnswerResponse> getAll() {

        return userAnswerService.getAll();
    }

    @GetMapping("/{id}")
    public UserAnswerResponse getById(
            @PathVariable Long id
    ) {

        return userAnswerService.getById(id);
    }

    @GetMapping("/user/{userId}")
    public List<UserAnswerResponse> getByUser(
            @PathVariable Long userId
    ) {

        return userAnswerService.getByUser(
                userId
        );
    }

    @GetMapping("/question/{questionId}")
    public List<UserAnswerResponse> getByQuestion(
            @PathVariable Long questionId
    ) {

        return userAnswerService.getByQuestion(
                questionId
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return userAnswerService.delete(id);
    }
}