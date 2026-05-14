package com.brainedu.BrainEdu.dto.request.AuthRequest;
import lombok.Data;

@Data
public class LoginRequest {

    private String email;

    private String password;
}