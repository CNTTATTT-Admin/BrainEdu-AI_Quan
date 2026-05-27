package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.UserBehaviorRequest;
import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.UserBehaviorResponse;
import com.brainedu.BrainEdu.service.userBehaviorService.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}