package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.*;
import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;
import com.brainedu.BrainEdu.service.AIRecommendationService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/ai-recommendations")
@RequiredArgsConstructor
public class AIRecommendationController {

    private final AIRecommendationService
            recommendationService;

    @PostMapping
    public ApiResponse<AIRecommendationResponse>
    create(
            @RequestBody
            AIRecommendationRequest request
    ) {

        return ResponseFactory.success(
                "AI recommendation created successfully",
                recommendationService.create(request)
        );
    }

    @GetMapping
    public ApiResponse<List<AIRecommendationResponse>>
    getAll(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<AIRecommendationResponse>
                recommendations =
                recommendationService.getAll(
                        page,
                        size
                );

        return ResponseFactory.success(
                "AI recommendations fetched successfully",
                recommendations.getContent(),
                ResponseFactory.pagination(
                        recommendations
                )
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<AIRecommendationResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "AI recommendation fetched successfully",
                recommendationService.getById(id)
        );
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<AIRecommendationResponse>>
    getByUser(

            @PathVariable Long userId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<AIRecommendationResponse>
                recommendations =
                recommendationService.getByUser(
                        userId,
                        page,
                        size
                );

        return ResponseFactory.success(
                "User AI recommendations fetched successfully",
                recommendations.getContent(),
                ResponseFactory.pagination(
                        recommendations
                )
        );
    }

    @GetMapping("/type/{type}")
    public ApiResponse<List<AIRecommendationResponse>>
    getByType(

            @PathVariable String type,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<AIRecommendationResponse>
                recommendations =
                recommendationService.getByType(
                        type,
                        page,
                        size
                );

        return ResponseFactory.success(
                "AI recommendations by type fetched successfully",
                recommendations.getContent(),
                ResponseFactory.pagination(
                        recommendations
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "AI recommendation deleted successfully",
                recommendationService.delete(id)
        );
    }
}