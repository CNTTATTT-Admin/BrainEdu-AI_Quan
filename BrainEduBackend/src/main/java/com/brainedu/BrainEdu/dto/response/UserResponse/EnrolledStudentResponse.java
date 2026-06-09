package com.brainedu.BrainEdu.dto.response.UserResponse;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrolledStudentResponse {
    private Long id;
    private String name;
    private String email;
    private String avatar;
    private LocalDateTime enrolledAt;
    private Float completionPercent;
    private String enrollmentStatus;
}