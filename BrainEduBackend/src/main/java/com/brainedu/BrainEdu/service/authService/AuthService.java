package com.brainedu.BrainEdu.service.authService;

import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.SendOtp;
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

//     String forgotPassword(
//             ForgotPasswordRequest request
//     );

    void sendForgotPasswordOtp(SendOtp request);
    void resetPassword(ResetPasswordRequest request);
}