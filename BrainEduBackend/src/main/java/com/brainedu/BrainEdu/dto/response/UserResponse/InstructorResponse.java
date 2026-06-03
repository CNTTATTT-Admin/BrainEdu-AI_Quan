package com.brainedu.BrainEdu.dto.response.UserResponse;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorResponse {

    private Long id;

    private String fullName;

    private String email;

    private Long totalCourses;

    private Long totalEnrollments;

    private String status;
}