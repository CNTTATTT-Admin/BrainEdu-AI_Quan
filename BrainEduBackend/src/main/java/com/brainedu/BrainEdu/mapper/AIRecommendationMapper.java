package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;
import com.brainedu.BrainEdu.entity.AIRecommendation;
import org.springframework.stereotype.Component;

@Component
public class AIRecommendationMapper {

    public AIRecommendationResponse toResponse(
            AIRecommendation recommendation
    ) {

        return AIRecommendationResponse.builder()

                .id(
                        recommendation.getId()
                )

                .userId(
                        recommendation.getUser()
                                .getId()
                )

                .userName(
                        recommendation.getUser()
                                .getName()
                )

                .recommendationType(
                        recommendation.getRecommendationType()
                )

                .targetId(
                        recommendation.getTargetId()
                )

                .score(
                        recommendation.getScore()
                )

                .reason(
                        recommendation.getReason()
                )

                .createdAt(
                        recommendation.getCreatedAt()
                )

                .build();
    }
}