package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.AuthRequest.*;

import com.brainedu.BrainEdu.dto.response.AuthResponse.AuthResponse;
import com.brainedu.BrainEdu.service.authService.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestBody RefreshTokenRequest request) {
        return authService.refresh(request);
    }
    @PostMapping("/logout")
    public String logout (@RequestBody LogoutRequest request) {
        return authService.logout(request);
    }
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return authService.forgotPassword(request);
    }
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {
        return authService.resetPassword(request);
    }

}