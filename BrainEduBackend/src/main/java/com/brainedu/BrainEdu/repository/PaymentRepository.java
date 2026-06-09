package com.brainedu.BrainEdu.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.brainedu.BrainEdu.common.enums.PaymentStatus;
import com.brainedu.BrainEdu.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTxnRef(String txnRef);

    @Query("SELECT p FROM Payment p WHERE p.status = 'PENDING' AND p.createdAt < :time")
    List<Payment> findExpiredPayments(LocalDateTime time);
    boolean existsByUserIdAndCourseIdAndStatus(
            Long userId,
            Long courseId,
            PaymentStatus status
    );

    Optional<Payment> findByUserIdAndCourseIdAndStatus(Long userId, Long courseId, PaymentStatus status);
}