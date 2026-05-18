package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.SkillResponse.SkillResponse;
import com.brainedu.BrainEdu.entity.Skill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    @Mapping(
            target = "categoryId",
            source = "category.id"
    )
    @Mapping(
            target = "categoryName",
            source = "category.categoryName"
    )

    SkillResponse toResponse(
            Skill skill
    );
}