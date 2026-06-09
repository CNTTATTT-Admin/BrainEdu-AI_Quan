package com.brainedu.BrainEdu.service.paymentService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.brainedu.BrainEdu.common.enums.EnrollmentStatus;
import com.brainedu.BrainEdu.common.enums.PaymentStatus;
import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.config.VnpayConfig;
import com.brainedu.BrainEdu.dto.response.PaymentResponse.PaymentResponse;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Enrollment;
import com.brainedu.BrainEdu.entity.Payment;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.EnrollmentRepository;
import com.brainedu.BrainEdu.repository.PaymentRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.ultils.VnpayUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final VnpayConfig config;

    // PaymentServiceImpl.java
    @Override
    @Transactional
    public PaymentResponse createPayment(Long userId, Long courseId, String ip) {

        // 1. Idempotency: nếu đã có payment PENDING → trả về luôn
        Optional<Payment> existingPayment = paymentRepository
            .findByUserIdAndCourseIdAndStatus(userId, courseId, PaymentStatus.PENDING);
        if (existingPayment.isPresent()) {
            Payment p = existingPayment.get();
            return buildPaymentUrl(p);
        }

        // 2. Nếu đã SUCCESS → không cho tạo lại
        boolean alreadyPaid = paymentRepository
            .existsByUserIdAndCourseIdAndStatus(userId, courseId, PaymentStatus.SUCCESS);
        if (alreadyPaid) {
            throw new ApiException("Course already purchased");
        }

        // 3. Tạo Payment
        String txnRef = UUID.randomUUID().toString();
        Course courseDetail = courseRepository.findById(courseId)
            .orElseThrow(() -> new ApiException("Course not found"));
        Payment payment = Payment.builder()
                .userId(userId)
                .courseId(courseId)
                .amount(courseDetail.getPrice())
                .txnRef(txnRef)
                .status(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);

        // 4. Tạo Enrollment PENDING_PAYMENT nếu chưa có
        boolean alreadyEnrolled = enrollmentRepository
            .existsByUserIdAndCourseId(userId, courseId);
        if (!alreadyEnrolled) {
            Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ApiException("Course not found"));
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("User not found"));

            Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .completionPercent(0F)
                .status(EnrollmentStatus.PENDING_PAYMENT)
                .enrolledAt(LocalDateTime.now())
                .build();
            enrollmentRepository.save(enrollment);
        }

        return buildPaymentUrl(payment);
    }

    private PaymentResponse buildPaymentUrl(Payment payment) {
        String paymentUrl = "http://localhost:8080/api/v1/payments/mock"
            + "?txnRef=" + payment.getTxnRef()
            + "&amount=" + payment.getAmount()
            + "&returnUrl=http://localhost:8080/api/v1/payments/mock/return";

        return PaymentResponse.builder()
            .paymentId(payment.getId())
            .txnRef(payment.getTxnRef())
            .amount(payment.getAmount())
            .paymentUrl(paymentUrl)
            .status(payment.getStatus())
            .build();
    }

    private String vnpUrlEncode(String value) {
    try {
        return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
    } catch (Exception e) {
        return "";
    }
}

    @Override
    @Transactional
    public void handleIPN(Map<String, String> params) {
        String secureHash = params.remove("vnp_SecureHash");

        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();

        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                // ✅ Dùng raw value, không encode
                hashData.append(fieldName).append('=').append(fieldValue);
                if (itr.hasNext()) {
                    hashData.append('&');
                }
            }
        }

        String checkHash = VnpayUtil.hmacSHA512(config.getHashSecret().trim(), hashData.toString());

        if (!checkHash.equalsIgnoreCase(secureHash)) {
            throw new RuntimeException("Invalid signature");
        }

        String txnRef = params.get("vnp_TxnRef");
        String responseCode = params.get("vnp_ResponseCode");

        Payment payment = paymentRepository.findByTxnRef(txnRef)
                .orElseThrow(() -> new ApiException("Payment not found"));

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return;
        }

        if ("00".equals(responseCode)) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setPaidAt(LocalDateTime.now());
            payment.setVnpResponseCode(responseCode);

            Enrollment enrollment = enrollmentRepository
                    .findByUserIdAndCourseId(payment.getUserId(), payment.getCourseId())
                    .orElseThrow(() -> new ApiException("Enrollment not found"));

            enrollment.setStatus(EnrollmentStatus.ACTIVE);
            enrollment.setEnrolledAt(LocalDateTime.now());

            enrollmentRepository.save(enrollment);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }

        paymentRepository.save(payment);
    }
}