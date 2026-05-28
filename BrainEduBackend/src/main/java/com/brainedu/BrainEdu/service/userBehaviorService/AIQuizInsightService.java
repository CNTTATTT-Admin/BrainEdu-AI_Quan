package com.brainedu.BrainEdu.service.userBehaviorService;

import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.*;
import com.brainedu.BrainEdu.entity.UserAIInsight;

public interface AIQuizInsightService {

    UserAIInsight analyzeQuiz(
            QuizAnalysisRequest request
    );

}
