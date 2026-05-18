package com.brainedu.BrainEdu.service.authService.password;

import com.brainedu.BrainEdu.dto.request.AuthRequest.*;

public interface PasswordResetService {

    String forgotPassword(
            ForgotPasswordRequest request
    );

    String resetPassword(
            ResetPasswordRequest request
    );
}