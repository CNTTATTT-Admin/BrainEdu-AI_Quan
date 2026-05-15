package com.brainedu.BrainEdu.service.AIRecommendationService;

import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.*;
import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;

import java.util.List;

public interface AIRecommendationService {

    AIRecommendationResponse create(
            AIRecommendationRequest request
    );

    List<AIRecommendationResponse> getAll();

    AIRecommendationResponse getById(
            Long id
    );

    List<AIRecommendationResponse> getByUser(
            Long userId
    );

    List<AIRecommendationResponse> getByType(
            String type
    );

    String delete(
            Long id
    );
}