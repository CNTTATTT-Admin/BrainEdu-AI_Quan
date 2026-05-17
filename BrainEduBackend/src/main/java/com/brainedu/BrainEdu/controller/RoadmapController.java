package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import com.brainedu.BrainEdu.service.roadmapService.RoadmapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
            @RequestBody
            RoadmapRequest request
    ) {

        return ApiResponse
                .<RoadmapResponse>builder()

                .success(true)

                .message(
                        "Roadmap created successfully"
                )

                .data(
                        roadmapService.create(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<RoadmapResponse>>
    getAll() {

        return ApiResponse
                .<List<RoadmapResponse>>builder()

                .success(true)

                .message(
                        "Roadmaps fetched successfully"
                )

                .data(
                        roadmapService.getAll()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<RoadmapResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<RoadmapResponse>builder()

                .success(true)

                .message(
                        "Roadmap fetched successfully"
                )

                .data(
                        roadmapService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<List<RoadmapResponse>>
    getByCategory(
            @PathVariable Long categoryId
    ) {

        return ApiResponse
                .<List<RoadmapResponse>>builder()

                .success(true)

                .message(
                        "Roadmaps by category fetched successfully"
                )

                .data(
                        roadmapService.getByCategory(
                                categoryId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/level/{level}")
    public ApiResponse<List<RoadmapResponse>>
    getByLevel(
            @PathVariable String level
    ) {

        return ApiResponse
                .<List<RoadmapResponse>>builder()

                .success(true)

                .message(
                        "Roadmaps by level fetched successfully"
                )

                .data(
                        roadmapService.getByLevel(
                                level
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<RoadmapResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            RoadmapRequest request
    ) {

        return ApiResponse
                .<RoadmapResponse>builder()

                .success(true)

                .message(
                        "Roadmap updated successfully"
                )

                .data(
                        roadmapService.update(
                                id,
                                request
                        )
                )

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
                        "Roadmap deleted successfully"
                )

                .data(
                        roadmapService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}