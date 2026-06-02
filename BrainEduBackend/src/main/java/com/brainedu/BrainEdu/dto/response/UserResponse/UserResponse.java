package com.brainedu.BrainEdu.dto.response.UserResponse;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private String role;

    private String status;

    private String createdAt;
}