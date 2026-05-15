package com.brainedu.BrainEdu.service.courseSkillService;

import com.brainedu.BrainEdu.dto.request.CourseSkillRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.*;

import java.util.List;

public interface CourseSkillService {

    CourseSkillResponse addSkill(
            CourseSkillRequest request
    );

    List<CourseSkillResponse>
    getByCourse(
            Long courseId
    );

    List<CourseSkillResponse>
    getBySkill(
            Long skillId
    );

    String remove(
            Long id
    );
}