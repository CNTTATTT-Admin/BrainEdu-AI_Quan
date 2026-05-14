package com.brainedu.BrainEdu.dto.response.AuthResponse;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String accessToken;

    private String refreshToken;

    private String type;

    private Long expiresIn;
}