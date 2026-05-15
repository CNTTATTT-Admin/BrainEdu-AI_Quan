package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.*;
import com.brainedu.BrainEdu.entity.CourseSkill;
import org.springframework.stereotype.Component;

@Component
public class CourseSkillMapper {

    public CourseSkillResponse toResponse(
            CourseSkill courseSkill
    ) {

        return CourseSkillResponse.builder()

                .id(
                        courseSkill.getId()
                )

                .courseId(
                        courseSkill.getCourse()
                                .getId()
                )

                .courseTitle(
                        courseSkill.getCourse()
                                .getTitle()
                )

                .skillId(
                        courseSkill.getSkill()
                                .getId()
                )

                .skillName(
                        courseSkill.getSkill()
                                .getSkillName()
                )

                .build();
    }
}