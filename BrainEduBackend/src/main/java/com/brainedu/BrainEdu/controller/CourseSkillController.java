package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.CourseSkillRequest.CourseSkillRequest;
import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.CourseSkillResponse;
import com.brainedu.BrainEdu.service.courseSkillService.CourseSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/course-skills")
@RequiredArgsConstructor
public class CourseSkillController {

    private final CourseSkillService
            courseSkillService;

    @PostMapping
    public ApiResponse<CourseSkillResponse>
    addSkill(
            @RequestBody
            CourseSkillRequest request
    ) {

        return ResponseFactory.success(
                "Skill added to course successfully",
                courseSkillService.addSkill(
                        request
                )
        );
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<List<CourseSkillResponse>>
    getByCourse(
            @PathVariable Long courseId
    ) {

        return ResponseFactory.success(
                "Course skills fetched successfully",
                courseSkillService.getByCourse(
                        courseId
                )
        );
    }

    @GetMapping("/skill/{skillId}")
    public ApiResponse<List<CourseSkillResponse>>
    getBySkill(
            @PathVariable Long skillId
    ) {

        return ResponseFactory.success(
                "Skill courses fetched successfully",
                courseSkillService.getBySkill(
                        skillId
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    remove(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Course skill removed successfully",
                courseSkillService.remove(id)
        );
    }
}