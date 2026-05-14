package com.brainedu.BrainEdu.dto.request.AuthRequest;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String token;

    private String newPassword;
}