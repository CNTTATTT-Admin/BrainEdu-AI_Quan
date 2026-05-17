package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.CourseSkillRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.*;
import com.brainedu.BrainEdu.service.courseSkillService.CourseSkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

        return ApiResponse
                .<CourseSkillResponse>builder()

                .success(true)

                .message(
                        "Skill added to course successfully"
                )

                .data(
                        courseSkillService.addSkill(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<
            List<CourseSkillResponse>
            > getByCourse(
            @PathVariable Long courseId
    ) {

        return ApiResponse
                .<List<CourseSkillResponse>>
                        builder()

                .success(true)

                .message(
                        "Course skills fetched successfully"
                )

                .data(
                        courseSkillService.getByCourse(
                                courseId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/skill/{skillId}")
    public ApiResponse<
            List<CourseSkillResponse>
            > getBySkill(
            @PathVariable Long skillId
    ) {

        return ApiResponse
                .<List<CourseSkillResponse>>
                        builder()

                .success(true)

                .message(
                        "Skill courses fetched successfully"
                )

                .data(
                        courseSkillService.getBySkill(
                                skillId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    remove(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Course skill removed successfully"
                )

                .data(
                        courseSkillService.remove(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}