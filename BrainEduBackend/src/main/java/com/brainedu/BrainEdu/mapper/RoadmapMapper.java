package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.RoadmapResponse.RoadmapResponse;
import com.brainedu.BrainEdu.entity.Roadmap;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoadmapMapper {

    @Mapping(
            target = "categoryId",
            source = "category.id"
    )
    @Mapping(
            target = "categoryName",
            source = "category.categoryName"
    )

    RoadmapResponse toResponse(
            Roadmap roadmap
    );
}