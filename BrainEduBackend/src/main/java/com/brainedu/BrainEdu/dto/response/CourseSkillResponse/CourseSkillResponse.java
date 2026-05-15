package com.brainedu.BrainEdu.dto.response.CourseSkillResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseSkillResponse {

    private Long id;

    private Long courseId;

    private String courseTitle;

    private Long skillId;

    private String skillName;
}