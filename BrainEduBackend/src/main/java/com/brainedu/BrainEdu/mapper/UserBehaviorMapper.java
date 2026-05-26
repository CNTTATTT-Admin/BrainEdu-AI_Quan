package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.UserBehaviorRequest;
import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.UserBehaviorResponse;
import com.brainedu.BrainEdu.entity.UserBehavior;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserBehaviorMapper {

    UserBehavior toEntity(
            UserBehaviorRequest request
    );

    UserBehaviorResponse toResponse(
            UserBehavior entity
    );
}