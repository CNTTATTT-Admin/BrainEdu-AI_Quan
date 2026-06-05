package com.brainedu.BrainEdu.service.userBehaviorService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIQuizInsightOrchestratorService {

    private final RestTemplate
            restTemplate;
        @Value("${ai.service.url}")
        private String aiServiceUrl;
    public Object analyzeQuiz(

            Long userId,

            Long quizSubmissionId
    ) {

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "user_id",
                userId
        );

        request.put(
                "quiz_submission_id",
                quizSubmissionId
        );

        return restTemplate.postForObject(

                aiServiceUrl + "/analyze/quiz",

                request,

                Object.class
        );
    }

}
