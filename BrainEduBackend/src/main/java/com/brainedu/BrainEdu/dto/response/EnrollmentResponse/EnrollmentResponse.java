package com.brainedu.BrainEdu.dto.response.EnrollmentResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class EnrollmentResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long courseId;

    private String courseTitle;

    private Float completionPercent;

    private String status;

    private LocalDateTime enrolledAt;
}