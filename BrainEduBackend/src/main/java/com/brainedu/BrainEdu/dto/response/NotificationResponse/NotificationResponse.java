package com.brainedu.BrainEdu.dto.response.NotificationResponse;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {

    private Long id;

    private Long userId;

    private String userEmail;

    private String title;

    private String content;

    private String type;

    private Boolean isRead;

    private LocalDateTime createdAt;
}