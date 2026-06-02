package com.brainedu.BrainEdu.dto.response.AuthResponse;

import java.util.Set;

import lombok.*;

@Data
@Builder
public class UserInfoResponse {

    private Long id;

    private String fullName;

    private String email;

    private String roles;
}