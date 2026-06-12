package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.EmailRequest.*;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.SendOtp;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.VerifyOtp;
import com.brainedu.BrainEdu.service.mailService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public ApiResponse<String> 
    sendOtp(
            @RequestBody 
            SendOtp request
    ) {
        otpService.sendRegisterOtp(request);
        return ResponseFactory.success(
                "Mã OTP xác thực đã được gửi đi thành công",
                null
        );
    }

    @PostMapping("/verify")
    public ApiResponse<String> 
    verifyOtp(
            @RequestBody 
            VerifyOtp request
    ) {
        otpService.verifyRegisterOtp(request);
        return ResponseFactory.success(
                "Xác thực mã OTP thành công",
                null
        );
    }

    @PostMapping("/invite")
        public ApiResponse<String> sendInvitation(
                @RequestBody InviteLecturerRequest request
        ) {
        otpService.sendInvitationEmail(request);
        return ResponseFactory.success(
                "Lời mời hợp tác đã được gửi đến email của giảng viên",
                null
        );
        }
}