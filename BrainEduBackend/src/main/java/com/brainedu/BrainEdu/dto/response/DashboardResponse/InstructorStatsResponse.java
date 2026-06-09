package com.brainedu.BrainEdu.dto.response.DashboardResponse;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorStatsResponse {
    private Long totalCourses;
    private Long totalStudents;
    private Long pendingAssignments;
}