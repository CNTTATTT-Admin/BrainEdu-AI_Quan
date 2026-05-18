package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.CourseSkillResponse;
import com.brainedu.BrainEdu.entity.CourseSkill;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CourseSkillMapper {

    @Mapping(
            target = "courseId",
            source = "course.id"
    )
    @Mapping(
            target = "courseTitle",
            source = "course.title"
    )
    @Mapping(
            target = "skillId",
            source = "skill.id"
    )
    @Mapping(
            target = "skillName",
            source = "skill.skillName"
    )
    CourseSkillResponse toResponse(
            CourseSkill courseSkill
    );
}