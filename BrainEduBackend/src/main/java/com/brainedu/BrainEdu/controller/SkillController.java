package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.SkillRequest.SkillRequest;
import com.brainedu.BrainEdu.dto.response.SkillResponse.SkillResponse;
import com.brainedu.BrainEdu.service.skillService.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

        return ApiResponse
                .<SkillResponse>builder()

                .success(true)

                .message(
                        "Skill created successfully"
                )

                .data(
                        skillService.create(
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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
                PaginationMeta.builder()

                        .page(
                                skills.getNumber()
                        )

                        .size(
                                skills.getSize()
                        )

                        .totalElements(
                                skills
                                        .getTotalElements()
                        )

                        .totalPages(
                                skills
                                        .getTotalPages()
                        )

                        .hasNext(
                                skills.hasNext()
                        )

                        .hasPrevious(
                                skills
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<SkillResponse>>builder()

                .success(true)

                .message(
                        "Skills fetched successfully"
                )

                .data(
                        skills.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SkillResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<SkillResponse>builder()

                .success(true)

                .message(
                        "Skill fetched successfully"
                )

                .data(
                        skillService.getById(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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
                PaginationMeta.builder()

                        .page(
                                skills.getNumber()
                        )

                        .size(
                                skills.getSize()
                        )

                        .totalElements(
                                skills
                                        .getTotalElements()
                        )

                        .totalPages(
                                skills
                                        .getTotalPages()
                        )

                        .hasNext(
                                skills.hasNext()
                        )

                        .hasPrevious(
                                skills
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<SkillResponse>>builder()

                .success(true)

                .message(
                        "Skills by category fetched successfully"
                )

                .data(
                        skills.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<SkillResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            SkillRequest request
    ) {

        return ApiResponse
                .<SkillResponse>builder()

                .success(true)

                .message(
                        "Skill updated successfully"
                )

                .data(
                        skillService.update(
                                id,
                                request
                        )
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "Skill deleted successfully"
                )

                .data(
                        skillService.delete(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}