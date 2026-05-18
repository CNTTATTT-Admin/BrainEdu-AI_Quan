package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.SkillRequest.SkillRequest;
import com.brainedu.BrainEdu.dto.response.SkillResponse.SkillResponse;
import com.brainedu.BrainEdu.service.skillService.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService
            skillService;

    @PostMapping
    public ApiResponse<SkillResponse>
    create(
            @RequestBody
            SkillRequest request
    ) {

        return ResponseFactory.success(
                "Skill created successfully",
                skillService.create(
                        request
                )
        );
    }

    @GetMapping
    public ApiResponse<List<SkillResponse>>
    getAll(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<SkillResponse> skills =
                skillService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        skills
                );

        return ResponseFactory.success(
                "Skills fetched successfully",
                skills.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<SkillResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Skill fetched successfully",
                skillService.getById(id)
        );
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<SkillResponse>>
    getByCategory(

            @PathVariable Long categoryId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<SkillResponse> skills =
                skillService.getByCategory(
                        categoryId,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        skills
                );

        return ResponseFactory.success(
                "Skills by category fetched successfully",
                skills.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<SkillResponse>
    update(

            @PathVariable Long id,

            @RequestBody
            SkillRequest request
    ) {

        return ResponseFactory.success(
                "Skill updated successfully",
                skillService.update(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Skill deleted successfully",
                skillService.delete(id)
        );
    }
}