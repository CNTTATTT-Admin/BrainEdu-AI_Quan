package com.brainedu.BrainEdu.dto.request.UserBehaviorRequest;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserBehaviorRequest {

    private String eventName;

    private String metadata;

    private String sessionId;

    private String pageUrl;

    private String userAgent;
}
