package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.AuthRequest.ForgotPasswordRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.LoginRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.LogoutRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.RefreshTokenRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.RegisterRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.ResetPasswordRequest;
import com.brainedu.BrainEdu.dto.response.AuthResponse.AuthResponse;
import com.brainedu.BrainEdu.service.authService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService
            authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse>
    register(
            @RequestBody
            RegisterRequest request
    ) {

        return ApiResponse
                .<AuthResponse>builder()

                .success(true)

                .message(
                        "Register successful"
                )

                .data(
                        authService.register(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse>
    login(
            @RequestBody
            LoginRequest request
    ) {

        return ApiResponse
                .<AuthResponse>builder()

                .success(true)

                .message(
                        "Login successful"
                )

                .data(
                        authService.login(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse>
    refresh(
            @RequestBody
            RefreshTokenRequest request
    ) {

        return ApiResponse
                .<AuthResponse>builder()

                .success(true)

                .message(
                        "Token refreshed successfully"
                )

                .data(
                        authService.refresh(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<String>
    logout(
            @RequestBody
            LogoutRequest request
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Logout successful"
                )

                .data(
                        authService.logout(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PostMapping("/forgot-password")
    public ApiResponse<String>
    forgotPassword(
            @RequestBody
            ForgotPasswordRequest request
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Reset password email sent successfully"
                )

                .data(
                        authService.forgotPassword(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PostMapping("/reset-password")
    public ApiResponse<String>
    resetPassword(
            @RequestBody
            ResetPasswordRequest request
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Password reset successful"
                )

                .data(
                        authService.resetPassword(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}