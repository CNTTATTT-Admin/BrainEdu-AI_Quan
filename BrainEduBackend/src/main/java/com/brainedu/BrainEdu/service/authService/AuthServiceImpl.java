package com.brainedu.BrainEdu.service.authService;

import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.service.authService.authentication.AuthenticationService;
import com.brainedu.BrainEdu.service.authService.password.PasswordResetService;
import com.brainedu.BrainEdu.service.authService.token.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {

    private final AuthenticationService
            authenticationService;

    private final TokenService
            tokenService;

    private final PasswordResetService
            passwordResetService;

    @Override
    public AuthResponse register(
            RegisterRequest request
    ) {

        User user =
                authenticationService
                        .register(request);

        return tokenService
                .generateTokens(user);
    }

    @Override
    public AuthResponse login(
            LoginRequest request
    ) {

        User user =
                authenticationService
                        .authenticate(request);

        return tokenService
                .generateTokens(user);
    }

    @Override
    public AuthResponse refresh(
            RefreshTokenRequest request
    ) {

        return tokenService.refreshToken(
                request.getRefreshToken()
        );
    }

    @Override
    public String logout(
            LogoutRequest request
    ) {

        tokenService.revokeRefreshToken(
                request.getRefreshToken()
        );

        return "Logout successful";
    }

    @Override
    public String forgotPassword(
            ForgotPasswordRequest request
    ) {

        return passwordResetService
                .forgotPassword(request);
    }

    @Override
    public String resetPassword(
            ResetPasswordRequest request
    ) {

        return passwordResetService
                .resetPassword(request);
    }
}