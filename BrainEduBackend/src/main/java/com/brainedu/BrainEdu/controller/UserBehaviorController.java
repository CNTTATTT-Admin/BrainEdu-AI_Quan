package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.QuizInsightRequest;
import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.UserBehaviorRequest;
import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.UserBehaviorResponse;
import com.brainedu.BrainEdu.service.userBehaviorService.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/behavior")
public class UserBehaviorController {

    private final UserBehaviorService
            userBehaviorService;
    private final RecommendationOrchestratorService
            recommendationOrchestratorService;
    private final CurrentUserService
            currentUserService;

    private final AIQuizInsightOrchestratorService orchestratorService;

    @PostMapping("/track")
    public UserBehaviorResponse trackBehavior(
            @RequestBody
            UserBehaviorRequest request
    ) {

        return userBehaviorService
                .trackBehavior(request);
    }

    @PostMapping("/recommend/me")
    public Object recommendMe() {

        Long userId = currentUserService.getCurrentUserId();

        return recommendationOrchestratorService
                .generateRoadmap(userId);
    }


    @PostMapping("/quiz-insight")
    public Object analyzeQuiz(

            @RequestBody QuizInsightRequest request
    ) {

        return orchestratorService.analyzeQuiz(

                request.getUser_id(),

                request.getQuiz_submission_id()
        );
    }

}