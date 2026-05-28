package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.*;
import com.brainedu.BrainEdu.entity.UserAIInsight;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAIInsightMapper {

    UserAIInsightResponse
    toResponse(
            UserAIInsight entity
    );

}
