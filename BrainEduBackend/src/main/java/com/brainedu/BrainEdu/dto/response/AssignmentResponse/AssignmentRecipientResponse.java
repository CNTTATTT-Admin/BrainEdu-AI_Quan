package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class AssignmentRecipientResponse {

    private Long id;

    private Long studentId;

    private String studentName;

    private String email;

    private LocalDateTime assignedAt;
}