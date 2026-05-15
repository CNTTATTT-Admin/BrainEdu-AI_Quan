package com.brainedu.BrainEdu.service.roadmapService;

import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;

import java.util.List;

public interface RoadmapService {

    RoadmapResponse create(
            RoadmapRequest request
    );

    List<RoadmapResponse> getAll();

    RoadmapResponse getById(
            Long id
    );

    List<RoadmapResponse> getByCategory(
            Long categoryId
    );

    List<RoadmapResponse> getByLevel(
            String level
    );

    RoadmapResponse update(
            Long id,
            RoadmapRequest request
    );

    String delete(
            Long id
    );
}