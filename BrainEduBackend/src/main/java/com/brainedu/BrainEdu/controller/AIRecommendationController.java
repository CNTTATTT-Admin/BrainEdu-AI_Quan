package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.*;
import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;
import com.brainedu.BrainEdu.service.AIRecommendationService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(
        "/api/v1/ai-recommendations"
)
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

        return ApiResponse
                .<AIRecommendationResponse>builder()

                .success(true)

                .message(
                        "AI recommendation created successfully"
                )

                .data(
                        recommendationService.create(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<
            List<AIRecommendationResponse>
            > getAll() {

        return ApiResponse
                .<List<AIRecommendationResponse>>
                        builder()

                .success(true)

                .message(
                        "AI recommendations fetched successfully"
                )

                .data(
                        recommendationService.getAll()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<AIRecommendationResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<AIRecommendationResponse>builder()

                .success(true)

                .message(
                        "AI recommendation fetched successfully"
                )

                .data(
                        recommendationService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<
            List<AIRecommendationResponse>
            > getByUser(
            @PathVariable Long userId
    ) {

        return ApiResponse
                .<List<AIRecommendationResponse>>
                        builder()

                .success(true)

                .message(
                        "User AI recommendations fetched successfully"
                )

                .data(
                        recommendationService.getByUser(
                                userId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/type/{type}")
    public ApiResponse<
            List<AIRecommendationResponse>
            > getByType(
            @PathVariable String type
    ) {

        return ApiResponse
                .<List<AIRecommendationResponse>>
                        builder()

                .success(true)

                .message(
                        "AI recommendations by type fetched successfully"
                )

                .data(
                        recommendationService.getByType(
                                type
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "AI recommendation deleted successfully"
                )

                .data(
                        recommendationService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}