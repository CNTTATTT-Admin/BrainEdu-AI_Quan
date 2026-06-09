package com.brainedu.BrainEdu.dto.response.UserResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopInstructorResponse {

    private Long instructorId;
    private String instructorName;
    private String instructorAvatar;
    private Long totalCourses;
    private Long totalStudentsEnrolled;
}