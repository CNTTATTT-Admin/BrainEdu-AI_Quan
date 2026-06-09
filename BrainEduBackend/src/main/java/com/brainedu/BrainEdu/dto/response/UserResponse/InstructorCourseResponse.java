package com.brainedu.BrainEdu.dto.response.UserResponse;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorCourseResponse {
    private Long id;
    private String title;
    private String level;
    private Float price;
    private String status;
}