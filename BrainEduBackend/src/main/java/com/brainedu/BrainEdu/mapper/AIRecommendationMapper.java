package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.AIRecommendationResponse;
import com.brainedu.BrainEdu.entity.AIRecommendation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AIRecommendationMapper {

    @Mapping(
            target = "userId",
            source = "user.id"
    )

    @Mapping(
            target = "userName",
            source = "user.name"
    )

    AIRecommendationResponse toResponse(
            AIRecommendation recommendation
    );
}