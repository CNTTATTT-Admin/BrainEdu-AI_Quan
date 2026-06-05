package com.brainedu.BrainEdu.dto.request.EmailRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class OtpRequest {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SendOtp {
        private String email;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VerifyOtp {
        private String email;
        private String otpCode;
    }
}