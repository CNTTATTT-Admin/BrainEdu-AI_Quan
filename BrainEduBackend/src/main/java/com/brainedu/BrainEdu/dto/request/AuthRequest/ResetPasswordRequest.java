package com.brainedu.BrainEdu.dto.request.AuthRequest;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String token;

    @NotBlank(
            message = "Password is required"
    )
    @Size(min = 6)
    private String newPassword;
}