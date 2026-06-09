package com.brainedu.BrainEdu.service.paymentService;

import java.util.Map;

import com.brainedu.BrainEdu.dto.response.PaymentResponse.PaymentResponse;

public interface PaymentService {
    PaymentResponse createPayment(Long userId, Long courseId, String ip);
    void handleIPN(Map<String, String> params);
}