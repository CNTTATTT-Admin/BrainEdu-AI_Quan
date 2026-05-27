package com.brainedu.BrainEdu.service.userBehaviorService;

import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.AIRecommendationRequest;
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

                "http://localhost:8000/recommend/roadmap",

                request,

                Object.class
        );
    }
}

