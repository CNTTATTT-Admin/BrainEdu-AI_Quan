package com.brainedu.BrainEdu.service.authService;

import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;

public interface AuthService {

    AuthResponse register(
            RegisterRequest request
    );

    AuthResponse login(
            LoginRequest request
    );

    AuthResponse refresh(
            RefreshTokenRequest request
    );

    String logout(
            LogoutRequest request
    );

    String forgotPassword(
            ForgotPasswordRequest request
    );

    String resetPassword(
            ResetPasswordRequest request
    );
}