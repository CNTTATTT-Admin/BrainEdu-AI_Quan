package com.brainedu.BrainEdu.ultils;

public class EmailTemplateUtil {

    public static String buildOtpEmail(String otpCode) {
        return "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #edf2f7; border-radius: 16px; background-color: #ffffff;\">" +
                "  <div style=\"text-align: center; margin-bottom: 24px;\">" +
                "    <h2 style=\"color: #0052cc; margin: 0; font-size: 24px;\">✨ BrainEdu AI</h2>" +
                "  </div>" +
                "  <div style=\"background-color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;\">" +
                "    <p style=\"font-size: 14px; color: #334155; line-height: 1.6; margin: 0 0 16px 0;\">" +
                "      Chào mừng bạn đến với hệ thống học tập cá nhân hóa <b>BrainEdu AI</b>. Mã OTP dùng để xác thực đăng ký tài khoản của bạn là:" +
                "    </p>" +
                "    <div style=\"text-align: center; margin: 28px 0;\">" +
                "      <span style=\"font-size: 36px; font-weight: bold; color: #0052cc; letter-spacing: 8px; background: #e2e8f0; padding: 12px 28px; border-radius: 10px; display: inline-block; font-family: 'Courier New', monospace;\">" + 
                otpCode + 
                "      </span>" +
                "    </div>" +
                "    <p style=\"font-size: 12px; color: #64748b; margin: 0;\">" +
                "      * Mã này có hiệu lực trong vòng <b>5 phút</b>. Vui lòng tuyệt đối không cung cấp mã này cho người khác để tránh rủi ro mất tài khoản." +
                "    </p>" +
                "  </div>" +
                "  <hr style=\"border: none; border-top: 1px solid #edf2f7; margin: 24px 0;\">" +
                "  <p style=\"font-size: 11px; color: #94a3b8; text-align: center; margin: 0;\">" +
                "    Đây là email tự động phát ra từ hệ thống BrainEdu, vui lòng không trả lời thư này." +
                "  </p>" +
                "</div>";
    }
}