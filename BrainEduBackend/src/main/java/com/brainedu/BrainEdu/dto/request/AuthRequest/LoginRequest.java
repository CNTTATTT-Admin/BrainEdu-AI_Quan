package com.brainedu.BrainEdu.dto.request.AuthRequest;
import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class LoginRequest {
    @Email(
            message = "Invalid email format"
    )
    @NotBlank(
            message = "Email is required"
    )
    private String email;

    @NotBlank(
            message = "Password is required"
    )
    private String password;
}