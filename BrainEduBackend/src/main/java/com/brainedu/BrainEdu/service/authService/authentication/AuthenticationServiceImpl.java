package com.brainedu.BrainEdu.service.authService.authentication;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.mailService.OtpService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl
        implements AuthenticationService {

    private final UserRepository
            userRepository;

    private final PasswordEncoder
            passwordEncoder;
    private final OtpService otpService;

    @Override
    @Transactional
    public User register(RegisterRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new ApiException("Email is required");
        }

        if (request.getOtpCode() == null || request.getOtpCode().isBlank()) {
            throw new ApiException("OTP code is required");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ApiException("Email already exists");
        }

        otpService.verifyRegisterOtp(
            new OtpRequest.VerifyOtp(request.getEmail(), request.getOtpCode())
        );

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        return userRepository.save(user);
    }

    @Override
    public User authenticate(
            LoginRequest request
    ) {

        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new ApiException(
                    "Invalid password"
            );
        }

        return user;
    }
}