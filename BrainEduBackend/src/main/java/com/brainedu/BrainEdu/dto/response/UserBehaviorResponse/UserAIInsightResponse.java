package com.brainedu.BrainEdu.dto.response.UserBehaviorResponse;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAIInsightResponse {

    private Long id;

    private Long userId;

    private String type;

    private Long referenceId;

    private String insightJson;

    private LocalDateTime createdAt;

}
