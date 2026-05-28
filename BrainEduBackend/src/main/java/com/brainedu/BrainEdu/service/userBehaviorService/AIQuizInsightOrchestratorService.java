package com.brainedu.BrainEdu.service.userBehaviorService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIQuizInsightOrchestratorService {

    private final RestTemplate
            restTemplate;

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

                "http://localhost:8000/analyze/quiz",

                request,

                Object.class
        );
    }

}
