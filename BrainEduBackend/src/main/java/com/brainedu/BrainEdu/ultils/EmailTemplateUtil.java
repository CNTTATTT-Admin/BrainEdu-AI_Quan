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

    public static String buildInvitationEmail(String lecturerName, String courseTitle) {
        return "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;\">" +
                "  <div style=\"text-align: center; margin-bottom: 32px;\">" +
                "    <h2 style=\"color: #0052cc; margin: 0; font-size: 28px;\">✨ BrainEdu AI</h2>" +
                "    <div style=\"margin-top: 8px; color: #64748b; font-size: 14px;\">Đồng hành cùng tri thức</div>" +
                "  </div>" +
                "  <div style=\"color: #334155; line-height: 1.7;\">" +
                "    <p style=\"margin-bottom: 20px;\">Chào giảng viên <b>" + lecturerName + "</b>,</p>" +
                "    <p style=\"margin-bottom: 20px;\">Chúng tôi rất ấn tượng với chuyên môn và kinh nghiệm của bạn. Với tầm nhìn phát triển nền tảng học tập cá nhân hóa, <b>BrainEdu AI</b> trân trọng mời bạn tham gia hợp tác xây dựng và giảng dạy khóa học:</p>" +
                "    <div style=\"background-color: #f1f5f9; padding: 20px; border-left: 4px solid #0052cc; border-radius: 4px; margin-bottom: 24px;\">" +
                "      <h3 style=\"margin: 0; color: #0052cc; font-size: 18px;\">" + courseTitle + "</h3>" +
                "    </div>" +
                "    <p style=\"margin-bottom: 24px;\">Sự góp mặt của bạn sẽ mang đến giá trị thực tiễn to lớn cho cộng đồng học viên của chúng tôi. Chúng tôi hy vọng có cơ hội thảo luận chi tiết hơn về lộ trình hợp tác này.</p>" +
                "  </div>" +
                "  <div style=\"text-align: center; margin: 32px 0;\">" +
                "    <a href=\"#\" style=\"background-color: #0052cc; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;\">Xem chi tiết lời mời</a>" +
                "  </div>" +
                "  <hr style=\"border: none; border-top: 1px solid #edf2f7; margin: 32px 0;\">" +
                "  <p style=\"font-size: 12px; color: #94a3b8; text-align: center; margin: 0;\">" +
                "    BrainEdu AI - Nền tảng học tập cá nhân hóa hàng đầu.<br>" +
                "    Nếu bạn có bất kỳ thắc mắc nào, vui lòng phản hồi lại email này để bộ phận hỗ trợ đối tác giải đáp." +
                "  </p>" +
                "</div>";
    }
}