package com.brainedu.BrainEdu.dto.response.DashboardResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardKpiResponse {
    private Long totalCourses;
    private Long currentMonthUsers;
    private Double userGrowthPercent;
    private Long currentMonthInstructors;
    private Double instructorGrowthPercent;
    private Double currentMonthRevenue;
    private Double revenueGrowthPercent;
}