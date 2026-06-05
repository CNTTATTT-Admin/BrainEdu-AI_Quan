package com.brainedu.BrainEdu.dto.request.AuthRequest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(
            message = "Name is required"
    )
    private String name;

    @Email(
            message = "Invalid email format"
    )

    @NotBlank(
            message = "Email is required"
    )
    private String email;

    @Size(
            min = 6,
            message = "Password must be at least 6 characters"
    )

    @NotBlank(
            message = "Password is required"
    )
    private String password;

    private String otpCode;
}