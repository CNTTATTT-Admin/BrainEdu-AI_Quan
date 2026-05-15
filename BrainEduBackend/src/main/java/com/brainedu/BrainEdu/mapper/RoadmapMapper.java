package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import com.brainedu.BrainEdu.entity.Roadmap;
import org.springframework.stereotype.Component;

@Component
public class RoadmapMapper {

    public RoadmapResponse toResponse(
            Roadmap roadmap
    ) {

        return RoadmapResponse.builder()

                .id(
                        roadmap.getId()
                )

                .categoryId(
                        roadmap.getCategory()
                                .getId()
                )

                .categoryName(
                        roadmap.getCategory()
                                .getCategoryName()
                )

                .roadmapName(
                        roadmap.getRoadmapName()
                )

                .level(
                        roadmap.getLevel()
                )

                .description(
                        roadmap.getDescription()
                )

                .build();
    }
}