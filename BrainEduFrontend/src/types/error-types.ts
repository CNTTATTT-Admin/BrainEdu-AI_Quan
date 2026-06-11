export const ERROR_MESSAGES: Record<string, string> = {
    // Auth error
    "User not found": "Email không tồn tại trong hệ thống.",
    "Invalid password": "Mật khẩu không chính xác.",
    "Email is required": "Nhập đầy đủ Email",
    "Email already exists": "Email này đã được đăng ký tài khoản, hãy dùng email khác!",
    "OTP code is required": "Nhập đầy đủ mã OTP",
    "User not found with this email": "Không tìm thấy tài khoản có Email này",
    "OTP is invalid or expired": "Mã OTP không chính xác hoặc đã hết hạn",
    
    // Enroll error 
    "Course not found": "Không tìm thấy khóa học",
    "Already enrolled": "Khóa học này đã được đăng ký",
    "Enrollment not found": "Không tìm thấy khóa học này",

    // Payment error
    "Course already purchased": "Khóa học này đã được thanh toán",

    // Course error
    "Instructor not found": "Không tìm thấy giảng viên trong hệ thống",
    "Category not found": "Không tìm thấy danh mục trong hệ thống",
    "Price must be greater than 0": "Giá khóa học phải lớn hơn 0",
    "Course deleted successfully": "Xóa khóa học thành công",
    "You must be enrolled in this course to leave a review": "Bạn phải đăng ký khóa học trước khi đánh giá",

    // Lesson error
    "Lesson not found": "Không tìm thấy bài học",
    "Progress not found": "Không tìm thấy tiến trình cho bài học",
    "Lesson deleted successfully": "Xóa bài học thành công",

    // Assignment error
    "Assignment not found": "Không tìm thấy bài tập",
    "Student not found": "Không tìm thấy học viên",
    "Assignment not started yet": "Chưa đến giờ làm bài",
    "You are not assigned to this assignment": "Bạn chưa được giao bài tập này",
    "Assignment already graded": "Bài tập này đã được chấm điểm",
    "Essay must have answer text": "Bài tự luận bắt buộc phải có nội dung",
    "File is required for FILE_UPLOAD": "Bài tập này bắt buộc phải nộp file",
    "Invalid assignment type": "Sai định dạng bài tập",
    "Not your assignment": "Không phải bài tập của bạn",
    "Student has not submitted yet": "Học viên chưa nộp bài",
    "Already graded": "Bài tập đã được chấm điểm",
    "Invalid score": "Số điểm không hợp lệ",

    // Quiz Error
    "Quiz not found": "Không tìm thấy bài kiểm tra",     
    "Question does not belong to quiz": "Câu hỏi không thuộc về bài kiểm tra",     
    "Invalid answer for question": "Sai định dạng câu trả lời",     

    // ACCOUNT_LOCKED: "Tài khoản của bạn đã bị khóa.",
    DEFAULT: "Thao tác thất bại, vui lòng thử lại sau."
};