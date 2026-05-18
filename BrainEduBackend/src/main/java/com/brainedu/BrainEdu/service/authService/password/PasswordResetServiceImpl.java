package com.brainedu.BrainEdu.service.authService.password;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.security.JwtService;
import com.brainedu.BrainEdu.service.authService.password.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl
        implements PasswordResetService {

    private final UserRepository
            userRepository;

    private final JwtService
            jwtService;

    private final PasswordEncoder
            passwordEncoder;

    @Override
    public String forgotPassword(
            ForgotPasswordRequest request
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

        String resetToken =
                jwtService.generateResetToken(
                        user.getEmail()
                );

        String resetLink =
                "http://localhost:3000/reset-password?token="
                        + resetToken;

        System.out.println(resetLink);

        return "Reset password email sent";
    }

    @Override
    public String resetPassword(
            ResetPasswordRequest request
    ) {

        String token =
                request.getToken();

        if (jwtService.isTokenExpired(
                token
        )) {

            throw new ApiException(
                    "Reset token expired"
            );
        }

        String email =
                jwtService.extractEmail(
                        token
                );

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);

        return "Password reset successful";
    }
}