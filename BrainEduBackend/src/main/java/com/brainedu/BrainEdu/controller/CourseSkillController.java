package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.CourseSkillRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.*;
import com.brainedu.BrainEdu.service.courseSkillService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        "/api/v1/course-skills"
)
@RequiredArgsConstructor
public class CourseSkillController {

    private final CourseSkillService
            courseSkillService;

    @PostMapping
    public CourseSkillResponse addSkill(
            @RequestBody
            CourseSkillRequest request
    ) {

        return courseSkillService
                .addSkill(request);
    }

    @GetMapping("/course/{courseId}")
    public List<CourseSkillResponse>
    getByCourse(
            @PathVariable Long courseId
    ) {

        return courseSkillService
                .getByCourse(courseId);
    }

    @GetMapping("/skill/{skillId}")
    public List<CourseSkillResponse>
    getBySkill(
            @PathVariable Long skillId
    ) {

        return courseSkillService
                .getBySkill(skillId);
    }

    @DeleteMapping("/{id}")
    public String remove(
            @PathVariable Long id
    ) {

        return courseSkillService
                .remove(id);
    }
}