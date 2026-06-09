package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.DashboardResponse.*;
import com.brainedu.BrainEdu.repository.DashboardRepository.KpiProjection;
import com.brainedu.BrainEdu.repository.DashboardRepository.WeeklyRevenueProjection;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DashboardMapper {

    DashboardKpiResponse toKpiResponse(KpiProjection projection);

    List<WeeklyRevenueResponse> toWeeklyRevenueList(List<WeeklyRevenueProjection> projections);
}