package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.SkillResponse.*;
import com.brainedu.BrainEdu.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper {

    public SkillResponse toResponse(
            Skill skill
    ) {

        return SkillResponse.builder()

                .id(skill.getId())

                .categoryId(
                        skill.getCategory()
                                .getId()
                )

                .categoryName(
                        skill.getCategory()
                                .getCategoryName()
                )

                .skillName(
                        skill.getSkillName()
                )

                .description(
                        skill.getDescription()
                )

                .build();
    }
}