package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.request.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse;
import com.brainedu.BrainEdu.entity.User;

public class UserMapper {

    public static User toEntity(UserRequest request) {

        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .build();
    }

    public static UserResponse toResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}