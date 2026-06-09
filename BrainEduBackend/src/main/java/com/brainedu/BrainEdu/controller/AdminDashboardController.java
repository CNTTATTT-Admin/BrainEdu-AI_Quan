package com.brainedu.BrainEdu.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.response.DashboardResponse.DashboardStatsResponse;
import com.brainedu.BrainEdu.dto.response.DashboardResponse.InstructorStatsResponse;
import com.brainedu.BrainEdu.service.dashboardService.DashboardService;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ApiResponse<DashboardStatsResponse> getDashboardStats() {
        return ResponseFactory.success(
                "Dashboard statistics fetched successfully",
                dashboardService.getAdminDashboardStats()
        );
    }
    @GetMapping("/instructor-stats")
    public ApiResponse<InstructorStatsResponse> getInstructorDashboardStats() {
        return ResponseFactory.success(
                "Get instructor dashboard statistics successfully",
                dashboardService.getDashboardStats()
        );
    }
}