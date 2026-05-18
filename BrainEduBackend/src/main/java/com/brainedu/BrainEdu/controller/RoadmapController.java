package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.RoadmapRequest.RoadmapRequest;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.RoadmapResponse;
import com.brainedu.BrainEdu.service.roadmapService.RoadmapService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roadmaps")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService
            roadmapService;

    @PostMapping
    public ApiResponse<RoadmapResponse>
    create(
            @Valid
            @RequestBody
            RoadmapRequest request
    ) {

        return ResponseFactory.success(
                "Roadmap created successfully",
                roadmapService.create(
                        request
                )
        );
    }

    @GetMapping
    public ApiResponse<List<RoadmapResponse>>
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

        Page<RoadmapResponse> roadmaps =
                roadmapService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        roadmaps
                );

        return ResponseFactory.success(
                "Roadmaps fetched successfully",
                roadmaps.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<RoadmapResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Roadmap fetched successfully",
                roadmapService.getById(id)
        );
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<RoadmapResponse>>
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

        Page<RoadmapResponse> roadmaps =
                roadmapService.getByCategory(
                        categoryId,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        roadmaps
                );

        return ResponseFactory.success(
                "Roadmaps by category fetched successfully",
                roadmaps.getContent(),
                meta
        );
    }

    @GetMapping("/level/{level}")
    public ApiResponse<List<RoadmapResponse>>
    getByLevel(
            @Valid
            @PathVariable String level,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<RoadmapResponse> roadmaps =
                roadmapService.getByLevel(
                        level,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        roadmaps
                );

        return ResponseFactory.success(
                "Roadmaps by level fetched successfully",
                roadmaps.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<RoadmapResponse>
    update(
            @Valid
            @PathVariable Long id,
            @RequestBody
            RoadmapRequest request
    ) {

        return ResponseFactory.success(
                "Roadmap updated successfully",
                roadmapService.update(
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
                "Roadmap deleted successfully",
                roadmapService.delete(id)
        );
    }
}