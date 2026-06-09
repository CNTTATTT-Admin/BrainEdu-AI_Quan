package com.brainedu.BrainEdu.common.enums; 

public enum NotificationType {
    COURSE_UPDATE,      // Cập nhật bài học mới, thay đổi lộ trình
    NEW_COMMENT,        // Có bình luận mới trong bài học hoặc thread thảo luận

    ASSIGNMENT_SUBMITTED, // (Gửi cho Giảng viên) Học viên vừa nộp bài tập mới
    ASSIGNMENT_GRADED,    // (Gửi cho Học viên) Giảng viên đã chấm điểm và nhận xét bài làm

    SYSTEM_ALERT,       // Thông báo bảo trì, cập nhật tính năng từ Admin (Dùng cho hàm createToAllUsers)
    PAYMENT_SUCCESS,    // Thông báo thanh toán mua khóa học thành công
    REMINDER            // Nhắc nhở học tập lịch học hoặc hạn nộp bài
}