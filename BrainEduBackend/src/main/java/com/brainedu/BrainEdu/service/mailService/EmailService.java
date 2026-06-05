package com.brainedu.BrainEdu.service.mailService;

public interface EmailService {
    void sendOtpEmail(String to, String otpCode);
}