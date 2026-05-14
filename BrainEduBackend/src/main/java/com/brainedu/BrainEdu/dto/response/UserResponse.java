package com.brainedu.BrainEdu.dto.response;

import lombok.*;

@Data
@Getter
@Setter
@Builder
public class UserResponse {

    private Long id;

    private String name;

    private String email;
}