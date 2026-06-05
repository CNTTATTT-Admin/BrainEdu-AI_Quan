package com.brainedu.BrainEdu.service.mailService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.ultils.*;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    @Async("emailExecutor")
    public void sendOtpEmail(String to, String otpCode) {
        log.info("Bắt đầu xử lý gửi OTP đến {} trên thread: {}", to, Thread.currentThread().getName());
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "BrainEdu AI Support");
            helper.setTo(to);
            helper.setSubject("[BrainEdu AI] - Mã xác thực OTP đăng ký tài khoản");
            
            String htmlContent = EmailTemplateUtil.buildOtpEmail(otpCode);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Gửi email thành công tới: {}", to);
            
        } catch (Exception e) {
            log.error("Gửi email thất bại tới {}. Lỗi chi tiết: ", to, e);
            throw new ApiException("Không thể gửi email xác thực hệ thống");
        }
    }
}