package com.brainedu.BrainEdu.service.authService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.response.AuthResponse.AuthResponse;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.security.JwtService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() == null
                || request.getEmail().isBlank()) {
            throw new ApiException(
                    "Email is required"
            );
        }
        if (userRepository.findByEmail(
                request.getEmail()
        ).isPresent()) {

            throw new ApiException(
                    "Email already exists"
            );
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role("USER")
                .build();

        userRepository.save(user);

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );
        String refreshToken =
                jwtService.generateRefreshToken(
                        user.getEmail()
                );
        return AuthResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .type("Bearer")
                .expiresIn(3600L)
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
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

        String accessToken =
                jwtService.generateToken(
                        user.getEmail()
                );

        String refreshToken =
                jwtService.generateRefreshToken(
                        user.getEmail()
                );

        user.setRefreshToken(refreshToken);

        userRepository.save(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .type("Bearer")
                .expiresIn(86400L)
                .build();
    }

    @Override
    public AuthResponse refresh(
            RefreshTokenRequest request
    ) {

        String refreshToken =
                request.getRefreshToken();

        if (!jwtService.hasTokenType(
                refreshToken,
                "refresh"
        )) {

            throw new ApiException(
                    "Invalid refresh token"
            );
        }

        if (jwtService.isTokenExpired(
                refreshToken
        )) {

            throw new ApiException(
                    "Refresh token expired"
            );
        }

        String email =
                jwtService.extractEmail(
                        refreshToken
                );

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );

        if (!refreshToken.equals(
                user.getRefreshToken()
        )) {

            throw new ApiException(
                    "Refresh token mismatch"
            );
        }

        String newAccessToken =
                jwtService.generateToken(email);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .type("Bearer")
                .expiresIn(86400L)
                .build();
    }

    @Override
    public String logout(
            LogoutRequest request
    ) {

        String refreshToken =
                request.getRefreshToken();

        String email =
                jwtService.extractEmail(
                        refreshToken
                );

        System.out.println(email);
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );

        user.setRefreshToken(null);

        userRepository.save(user);

        return "Logout successful";
    }

    @Override
    public String forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository
                .findByEmail(request.getEmail())
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

//        mailService.sendMail(
//                user.getEmail(),
//                "Reset Password",
//                "Click here to reset password: "
//                        + resetLink
//        );

        return "Reset password email sent";
    }

    @Override
    public String resetPassword(ResetPasswordRequest request) {
        String token = request.getToken();

        if (jwtService.isTokenExpired(token)) {

            throw new ApiException(
                    "Reset token expired"
            );
        }

        String email =
                jwtService.extractEmail(token);

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