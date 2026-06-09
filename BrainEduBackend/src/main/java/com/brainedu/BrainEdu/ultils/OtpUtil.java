package com.brainedu.BrainEdu.ultils;

import com.brainedu.BrainEdu.config.ApiException;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpUtil {

    private final Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();
    private static final long OTP_VALID_DURATION = 5 * 60 * 1000;

    private static class OtpData {
        String otpCode;
        long expiryTime;

        OtpData(String otpCode, long expiryTime) {
            this.otpCode = otpCode;
            this.expiryTime = expiryTime;
        }
    }

    public String generateAndSaveOtp(String email) {
        SecureRandom random = new SecureRandom();
        int num = 100000 + random.nextInt(900000);
        String otp = String.valueOf(num);

        long expiryTime = System.currentTimeMillis() + OTP_VALID_DURATION;
        otpStorage.put(email, new OtpData(otp, expiryTime));

        return otp;
    }

    public boolean verifyOtp(String email, String inputOtp) {
        OtpData data = otpStorage.get(email);
        if (data == null) {
            return false;
        }
        if (System.currentTimeMillis() > data.expiryTime) {
            otpStorage.remove(email);
            return false;
        }
        return data.otpCode.equals(inputOtp);
    }

    public void deleteOtp(String email) {
        otpStorage.remove(email);
    }

    public String hashSha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new ApiException("Lỗi hệ thống khi xử lý thuật toán mã hóa");
        }
    }
}