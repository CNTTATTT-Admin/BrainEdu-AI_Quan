package com.brainedu.BrainEdu.dto.response.DashboardResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyRevenueResponse {
    private String label;
    private Double amount;
    private Double percentage;
}