package com.brainedu.BrainEdu.dto.request.UserRequest;

import lombok.Data;

@Data
public class UserRequest {

    private String name;

    private String email;

    private String password;

    private String role;
}