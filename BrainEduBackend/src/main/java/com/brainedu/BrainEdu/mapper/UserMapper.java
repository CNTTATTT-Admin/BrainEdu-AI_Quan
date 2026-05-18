package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserRequest request);

    UserResponse toResponse(User user);
}