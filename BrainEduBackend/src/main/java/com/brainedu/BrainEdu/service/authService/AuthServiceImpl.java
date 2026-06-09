package com.brainedu.BrainEdu.service.authService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AuthRequest.*;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.SendOtp;
import com.brainedu.BrainEdu.dto.response.AuthResponse.*;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.authService.authentication.AuthenticationService;
// import com.brainedu.BrainEdu.service.authService.password.PasswordResetService;
import com.brainedu.BrainEdu.service.authService.token.TokenService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.brainedu.BrainEdu.ultils.OtpUtil;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
        implements AuthService {

    private final AuthenticationService
            authenticationService;

    private final TokenService
            tokenService;

//     private final PasswordResetService
//             passwordResetService;
    private final UserRepository userRepository;
    private final OtpUtil otpUtil; 
    private final PasswordEncoder passwordEncoder;
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

//     @Override
//     public String forgotPassword(
//             ForgotPasswordRequest request
//     ) {

//         return passwordResetService
//                 .forgotPassword(request);
//     }

    @Override
    public void sendForgotPasswordOtp(SendOtp request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("User not found with this email"));

        String otp = otpUtil.generateAndSaveOtp(user.getEmail());

        System.out.println("Gửi OTP khôi phục mật khẩu tới " + user.getEmail() + ": " + otp);
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("User not found with this email"));

        boolean isOtpValid = otpUtil.verifyOtp(request.getEmail(), request.getOtpCode());
        if (!isOtpValid) {
            throw new ApiException("Mã OTP không chính xác hoặc đã hết hạn");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otpUtil.deleteOtp(request.getEmail());
    }
}