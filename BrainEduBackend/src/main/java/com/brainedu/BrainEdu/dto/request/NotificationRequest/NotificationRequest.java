package com.brainedu.BrainEdu.dto.request.NotificationRequest;

import com.brainedu.BrainEdu.common.enums.NotificationType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {

    @NotNull
    @Positive
    private Long userId;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private NotificationType type;
}