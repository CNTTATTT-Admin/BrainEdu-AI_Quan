package com.brainedu.BrainEdu.service.authService.token;

import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.entity.User;

public interface TokenService {

    AuthResponse generateTokens(
            User user
    );

    AuthResponse refreshToken(
            String refreshToken
    );

    void revokeRefreshToken(
            String refreshToken
    );
}