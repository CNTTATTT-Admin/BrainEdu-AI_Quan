package com.brainedu.BrainEdu.dto.response.DashboardResponse;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class DashboardStatsResponse {
    private DashboardKpiResponse kpi;
    private List<WeeklyRevenueResponse> weeklyRevenue;
}