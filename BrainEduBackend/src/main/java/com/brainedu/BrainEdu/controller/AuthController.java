package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AuthRequest.ForgotPasswordRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.LoginRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.LogoutRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.RefreshTokenRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.RegisterRequest;
import com.brainedu.BrainEdu.dto.request.AuthRequest.ResetPasswordRequest;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.SendOtp;
import com.brainedu.BrainEdu.dto.response.AuthResponse.AuthResponse;
import com.brainedu.BrainEdu.service.authService.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
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

        return ResponseFactory.success(
                "Register successful",
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse>
    login(
            @Valid
            @RequestBody
            LoginRequest request
    ) {

        return ResponseFactory.success(
                "Login successful",
                authService.login(request)
        );
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse>
    refresh(
            @Valid
            @RequestBody
            RefreshTokenRequest request
    ) {

        return ResponseFactory.success(
                "Token refreshed successfully",
                authService.refresh(request)
        );
    }

    @PostMapping("/logout")
    public ApiResponse<String>
    logout(
            @RequestBody
            LogoutRequest request
    ) {

        return ResponseFactory.success(
                "Logout successful",
                authService.logout(request)
        );
    }

    @PostMapping("/forgot-password/send-otp")
    public ApiResponse<String> sendForgotPasswordOtp(
            @Valid @RequestBody SendOtp request
    ) {
        authService.sendForgotPasswordOtp(request);
        return ResponseFactory.success("Mã OTP khôi phục mật khẩu đã được gửi thành công", null);
    }

    @PostMapping("/forgot-password/reset")
    public ApiResponse<String> resetPasswordWithOtp(
            @Valid @RequestBody ResetPasswordRequest request
    ) {
        authService.resetPassword(request);
        return ResponseFactory.success("Đặt lại mật khẩu mới thành công", null);
    }
}