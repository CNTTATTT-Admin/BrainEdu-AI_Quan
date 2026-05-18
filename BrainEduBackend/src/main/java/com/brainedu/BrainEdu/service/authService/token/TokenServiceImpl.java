package com.brainedu.BrainEdu.service.authService.token;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl
        implements TokenService {

    private final JwtService
            jwtService;

    private final UserRepository
            userRepository;

    @Override
    public AuthResponse generateTokens(
            User user
    ) {

        String accessToken =
                jwtService.generateToken(
                        user.getEmail()
                );

        String refreshToken =
                jwtService.generateRefreshToken(
                        user.getEmail()
                );

        user.setRefreshToken(
                refreshToken
        );

        userRepository.save(user);

        return AuthResponse.builder()

                .accessToken(
                        accessToken
                )

                .refreshToken(
                        refreshToken
                )

                .type("Bearer")

                .expiresIn(86400L)

                .build();
    }

    @Override
    public AuthResponse refreshToken(
            String refreshToken
    ) {

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
                jwtService.generateToken(
                        email
                );

        return AuthResponse.builder()

                .accessToken(
                        newAccessToken
                )

                .refreshToken(
                        refreshToken
                )

                .type("Bearer")

                .expiresIn(86400L)

                .build();
    }

    @Override
    public void revokeRefreshToken(
            String refreshToken
    ) {

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

        user.setRefreshToken(null);

        userRepository.save(user);
    }
}