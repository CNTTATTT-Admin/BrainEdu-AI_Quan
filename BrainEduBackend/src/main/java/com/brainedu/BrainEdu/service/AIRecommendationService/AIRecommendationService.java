package com.brainedu.BrainEdu.service.AIRecommendationService;

import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.*;
import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AIRecommendationService {

    AIRecommendationResponse create(
            AIRecommendationRequest request
    );

    Page<AIRecommendationResponse> getAll(int page, int size);

    AIRecommendationResponse getById(
            Long id
    );

    Page<AIRecommendationResponse> getByUser(
            Long userId,
            int page,
            int size
    );

    Page<AIRecommendationResponse> getByType(
            String type,
            int page,
            int size
    );

    String delete(
            Long id
    );
}