package com.brainedu.BrainEdu.service.roadmapService;

import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RoadmapService {

    RoadmapResponse create(
            RoadmapRequest request
    );

    Page<RoadmapResponse> getAll(int page, int size);

    RoadmapResponse getById(
            Long id
    );

    Page<RoadmapResponse> getByCategory(
            Long categoryId,
            int page,
            int size
    );

    Page<RoadmapResponse> getByLevel(
            String level,
            int page,
            int size
    );

    RoadmapResponse update(
            Long id,
            RoadmapRequest request
    );

    String delete(
            Long id
    );
}