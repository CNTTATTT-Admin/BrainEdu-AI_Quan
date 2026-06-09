package com.brainedu.BrainEdu.service.dashboardService;

import com.brainedu.BrainEdu.dto.response.DashboardResponse.*;
import com.brainedu.BrainEdu.mapper.DashboardMapper;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.DashboardRepository;
import com.brainedu.BrainEdu.repository.DashboardRepository.InstructorStatsProjection;
import com.brainedu.BrainEdu.service.dashboardService.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DashboardRepository dashboardRepository;
    private final DashboardMapper dashboardMapper;
    private final CurrentUserService currentUserService;
    @Override
    public DashboardStatsResponse getAdminDashboardStats() {
        DashboardRepository.KpiProjection kpiProjection = dashboardRepository.getDashboardKpi();
        List<DashboardRepository.WeeklyRevenueProjection> weeklyProjections = dashboardRepository.getWeeklyRevenueAnalysis();

        DashboardKpiResponse kpiResponse = dashboardMapper.toKpiResponse(kpiProjection);
        List<WeeklyRevenueResponse> weeklyRevenueResponses = dashboardMapper.toWeeklyRevenueList(weeklyProjections);

        return DashboardStatsResponse.builder()
                .kpi(kpiResponse)
                .weeklyRevenue(weeklyRevenueResponses)
                .build();
    }

    @Override
    public InstructorStatsResponse getDashboardStats() {
        Long instructorId = currentUserService.getCurrentUserId();
        
        InstructorStatsProjection projection = dashboardRepository.getInstructorDashboardStats(instructorId);
        
        if (projection == null) {
            return InstructorStatsResponse.builder()
                    .totalCourses(0L)
                    .totalStudents(0L)
                    .pendingAssignments(0L)
                    .build();
        }
        
        return InstructorStatsResponse.builder()
                .totalCourses(projection.getTotalCourses() != null ? projection.getTotalCourses() : 0L)
                .totalStudents(projection.getTotalStudents() != null ? projection.getTotalStudents() : 0L)
                .pendingAssignments(projection.getPendingAssignments() != null ? projection.getPendingAssignments() : 0L)
                .build();
    }
}