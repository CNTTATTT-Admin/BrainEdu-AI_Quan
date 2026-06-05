package com.brainedu.BrainEdu.service.userBehaviorService;

import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.AIRecommendationRequest;

import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RecommendationOrchestratorService {

    private final UserProfileBuilderService
            profileBuilderService;

    private final RestTemplate
            restTemplate;

        @Value("${ai.service.url}")
                private String aiServiceUrl;

    public Object generateRoadmap(
            Long userId
    ) {

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "user_id",
                userId
        );

        return restTemplate.postForObject(
                aiServiceUrl + "/recommend/roadmap",
                request,
                Object.class
        );
    }
}

