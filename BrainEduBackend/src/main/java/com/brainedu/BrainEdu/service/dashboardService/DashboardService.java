package com.brainedu.BrainEdu.service.dashboardService;

import com.brainedu.BrainEdu.dto.response.DashboardResponse.DashboardStatsResponse;
import com.brainedu.BrainEdu.dto.response.DashboardResponse.InstructorStatsResponse;

public interface DashboardService {
    DashboardStatsResponse getAdminDashboardStats();
    InstructorStatsResponse getDashboardStats();
}