package com.brainedu.BrainEdu.controller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brainedu.BrainEdu.common.enums.EnrollmentStatus;
import com.brainedu.BrainEdu.common.enums.PaymentStatus;
import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.response.PaymentResponse.PaymentResponse;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Enrollment;
import com.brainedu.BrainEdu.entity.Payment;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.EnrollmentRepository;
import com.brainedu.BrainEdu.repository.PaymentRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.paymentService.PaymentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @PostMapping("/create")
    public ApiResponse<PaymentResponse> create(
            @RequestParam Long userId,
            @RequestParam Long courseId,
            HttpServletRequest request
    ) {
        PaymentResponse response = paymentService.createPayment(
                userId,
                courseId,
                request.getRemoteAddr()
        );
        return ResponseFactory.success("Payment created successfully", response);
    }

    // ─── Mock Payment ────────────────────────────────────────────────────────

    @GetMapping("/mock")
    public ResponseEntity<String> mockPaymentPage(
            @RequestParam String txnRef,
            @RequestParam Float amount,
            @RequestParam String returnUrl) {

        String html = """
                <html>
                <head><meta charset="UTF-8">
                <style>
                  body { font-family: Arial, sans-serif; text-align: center; padding: 60px; background: #f5f5f5; }
                  .card { background: white; border-radius: 12px; padding: 40px; max-width: 400px;
                          margin: auto; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
                  h2 { color: #333; }
                  .amount { font-size: 28px; font-weight: bold; color: #e53935; margin: 16px 0; }
                  .txn { color: #888; font-size: 13px; margin-bottom: 30px; }
                  a { text-decoration: none; }
                  button { padding: 14px 32px; font-size: 15px; border: none;
                           border-radius: 8px; cursor: pointer; margin: 8px; }
                  .btn-success { background: #43a047; color: white; }
                  .btn-cancel  { background: #e53935; color: white; }
                </style>
                </head>
                <body>
                  <div class="card">
                    <h2>🏦 Mock Payment Gateway</h2>
                    <div class="amount">%.0f VND</div>
                    <div class="txn">Mã GD: %s</div>
                    <a href="%s?vnp_ResponseCode=00&vnp_TxnRef=%s">
                      <button class="btn-success">✅ Thanh toán thành công</button>
                    </a><br>
                    <a href="%s?vnp_ResponseCode=99&vnp_TxnRef=%s">
                      <button class="btn-cancel">❌ Hủy thanh toán</button>
                    </a>
                  </div>
                </body>
                </html>
                """.formatted(amount, txnRef, returnUrl, txnRef, returnUrl, txnRef);

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(html);
    }

    @GetMapping("/mock/return")
        @Transactional
        public ResponseEntity<String> mockReturn(
                @RequestParam String vnp_ResponseCode,
                @RequestParam String vnp_TxnRef) {

        Payment payment = paymentRepository.findByTxnRef(vnp_TxnRef)
                .orElseThrow(() -> new ApiException("Payment not found"));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
                return ResponseEntity.ok().contentType(MediaType.TEXT_HTML)
                        .body(resultPage("✅ Khóa học đã được kích hoạt từ trước.", "#43a047"));
        }

        if ("00".equals(vnp_ResponseCode)) {
                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setPaidAt(LocalDateTime.now());
                payment.setVnpResponseCode(vnp_ResponseCode);
                paymentRepository.save(payment);

                Enrollment enrollment = enrollmentRepository
                        .findByUserIdAndCourseId(payment.getUserId(), payment.getCourseId())
                        .orElseGet(() -> {
                        Course course = courseRepository.findById(payment.getCourseId())
                                .orElseThrow(() -> new ApiException("Course not found"));
                        User user = userRepository.findById(payment.getUserId())
                                .orElseThrow(() -> new ApiException("User not found"));
                        return Enrollment.builder()
                                .user(user).course(course)
                                .completionPercent(0F)
                                .enrolledAt(LocalDateTime.now())
                                .build();
                        });

                enrollment.setStatus(EnrollmentStatus.ACTIVE);
                enrollment.setEnrolledAt(LocalDateTime.now());
                enrollmentRepository.save(enrollment);

                return ResponseEntity.ok().contentType(MediaType.TEXT_HTML)
                        .body(resultPage("✅ Thanh toán thành công! Khóa học đã được kích hoạt.", "#43a047"));
        } 
        
        else {
                payment.setStatus(PaymentStatus.FAILED);
                payment.setVnpResponseCode(vnp_ResponseCode); 
                paymentRepository.save(payment);
                
                
                return ResponseEntity.ok().contentType(MediaType.TEXT_HTML)
                        .body(resultPage("❌ Thanh toán thất bại. Vui lòng thử lại.", "#e53935"));
        }
        }
    private String resultPage(String message, String color) {
        return """
                <html>
                <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="refresh" content="3;url=http://localhost:5173/">
                        <style>
                        body { font-family: Arial; text-align: center; padding: 60px; background: #f5f5f5; }
                        .card { background: white; border-radius: 12px; padding: 40px; max-width: 400px;
                                margin: auto; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
                        h2 { color: %s; }
                        p { color: #666; font-size: 14px; }
                        </style>
                </head>
                <body>
                        <div class="card">
                        <h2>%s</h2>
                        <p>Đang chuyển hướng về trang chủ sau 3 giây...</p>
                        </div>
                </body>
                </html>
                """.formatted(color, message);
        }


    @GetMapping("/vnpay/ipn")
    public String ipn(HttpServletRequest request) {
        Map<String, String> params = request.getParameterMap().entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue()[0]));
        paymentService.handleIPN(params);
        return "OK";
    }

    @GetMapping("/vnpay/return")
    public String paymentReturn(HttpServletRequest request) {
        String responseCode = request.getParameter("vnp_ResponseCode");
        return "00".equals(responseCode) ? "Thanh toán thành công!" : "Thanh toán thất bại, mã lỗi: " + responseCode;
    }
}