package com.brainedu.BrainEdu.dto.response.UserBehaviorResponse;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBehaviorResponse {

    private Long id;

    private String eventName;

    private String metadata;

    private String sessionId;

    private String pageUrl;

    private String userAgent;

    private LocalDateTime createdAt;
}
