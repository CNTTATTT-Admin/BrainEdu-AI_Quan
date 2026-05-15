package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.*;
import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;
import com.brainedu.BrainEdu.service.AIRecommendationService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ai-recommendations")
@RequiredArgsConstructor
public class AIRecommendationController {

    private final AIRecommendationService
            recommendationService;

    @PostMapping
    public AIRecommendationResponse create(
            @RequestBody
            AIRecommendationRequest request
    ) {

        return recommendationService.create(
                request
        );
    }

    @GetMapping
    public List<AIRecommendationResponse> getAll() {

        return recommendationService.getAll();
    }

    @GetMapping("/{id}")
    public AIRecommendationResponse getById(
            @PathVariable Long id
    ) {

        return recommendationService.getById(id);
    }

    @GetMapping("/user/{userId}")
    public List<AIRecommendationResponse> getByUser(
            @PathVariable Long userId
    ) {

        return recommendationService.getByUser(
                userId
        );
    }

    @GetMapping("/type/{type}")
    public List<AIRecommendationResponse> getByType(
            @PathVariable String type
    ) {

        return recommendationService.getByType(
                type
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return recommendationService.delete(id);
    }
}