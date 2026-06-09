package com.brainedu.BrainEdu.dto.response.PaymentResponse;

import com.brainedu.BrainEdu.common.enums.PaymentStatus;

import lombok.*;

@Getter
@Setter
@Builder
public class PaymentResponse {
    private Long paymentId;
    private String txnRef;
    private Float amount;
    private String paymentUrl;
    private PaymentStatus status;
}