package com.brainedu.BrainEdu.dto.request.AuthRequest;

import lombok.Data;

@Data
public class LogoutRequest {

    private String refreshToken;
}