package com.brainedu.BrainEdu.service.mailService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.SendOtp;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.VerifyOtp;
import com.brainedu.BrainEdu.service.mailService.*;
import com.brainedu.BrainEdu.ultils.EmailTemplateUtil;
import com.brainedu.BrainEdu.ultils.OtpUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final StringRedisTemplate redisTemplate;
    private final EmailService emailService;

    private static final String OTP_KEY_PREFIX = "otp:register:";
    private static final String RETRY_KEY_PREFIX = "otp:retry:";
    private final OtpUtil otpUtil; 

    @Override
    public void sendRegisterOtp(SendOtp request) {
        String retryKey = RETRY_KEY_PREFIX + request.getEmail();
        String retryCountStr = redisTemplate.opsForValue().get(retryKey);
        
        if (retryCountStr != null && Integer.parseInt(retryCountStr) >= 5) {
            throw new ApiException("Tài khoản tạm thời bị khóa do thử sai quá nhiều lần. Vui lòng quay lại sau.");
        }

        String rawOtp = otpUtil.generateAndSaveOtp(request.getEmail());
        String hashedOtp = otpUtil.hashSha256(rawOtp);

        String otpKey = OTP_KEY_PREFIX + request.getEmail();
        redisTemplate.opsForValue().set(otpKey, hashedOtp, Duration.ofMinutes(5));

        emailService.sendOtpEmail(request.getEmail(), rawOtp);
    }

    @Override
    public void verifyRegisterOtp(VerifyOtp request) {
        String otpKey = OTP_KEY_PREFIX + request.getEmail();
        String retryKey = RETRY_KEY_PREFIX + request.getEmail();

        String retryCountStr = redisTemplate.opsForValue().get(retryKey);
        int retryCount = retryCountStr != null ? Integer.parseInt(retryCountStr) : 0;

        if (retryCount >= 5) {
            throw new ApiException("Chức năng bị khóa do nhập sai quá 5 lần.");
        }

        String savedHashedOtp = redisTemplate.opsForValue().get(otpKey);
        if (savedHashedOtp == null) {
            throw new ApiException("Mã OTP không tồn tại hoặc đã hết hạn sử dụng.");
        }

        String hashedUserOtp = otpUtil.hashSha256(request.getOtpCode());

        if (!savedHashedOtp.equals(hashedUserOtp)) {
            retryCount++;
            redisTemplate.opsForValue().set(retryKey, String.valueOf(retryCount), Duration.ofMinutes(15));
            throw new ApiException("Mã OTP không chính xác. Bạn còn " + (5 - retryCount) + " lần thử.");
        }

        redisTemplate.delete(otpKey);
        redisTemplate.delete(retryKey);
    }
}