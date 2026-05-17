package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.RoadmapRequest.RoadmapRequest;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.RoadmapResponse;
import com.brainedu.BrainEdu.service.roadmapService.RoadmapService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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
                PaginationMeta.builder()

                        .page(
                                roadmaps.getNumber()
                        )

                        .size(
                                roadmaps.getSize()
                        )

                        .totalElements(
                                roadmaps
                                        .getTotalElements()
                        )

                        .totalPages(
                                roadmaps
                                        .getTotalPages()
                        )

                        .hasNext(
                                roadmaps.hasNext()
                        )

                        .hasPrevious(
                                roadmaps
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<RoadmapResponse>>builder()

                .success(true)

                .message(
                        "Roadmaps fetched successfully"
                )

                .data(
                        roadmaps.getContent()
                )

                .meta(meta)

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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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
                PaginationMeta.builder()

                        .page(
                                roadmaps.getNumber()
                        )

                        .size(
                                roadmaps.getSize()
                        )

                        .totalElements(
                                roadmaps
                                        .getTotalElements()
                        )

                        .totalPages(
                                roadmaps
                                        .getTotalPages()
                        )

                        .hasNext(
                                roadmaps.hasNext()
                        )

                        .hasPrevious(
                                roadmaps
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<RoadmapResponse>>builder()

                .success(true)

                .message(
                        "Roadmaps by category fetched successfully"
                )

                .data(
                        roadmaps.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/level/{level}")
    public ApiResponse<List<RoadmapResponse>>
    getByLevel(

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
                PaginationMeta.builder()

                        .page(
                                roadmaps.getNumber()
                        )

                        .size(
                                roadmaps.getSize()
                        )

                        .totalElements(
                                roadmaps
                                        .getTotalElements()
                        )

                        .totalPages(
                                roadmaps
                                        .getTotalPages()
                        )

                        .hasNext(
                                roadmaps.hasNext()
                        )

                        .hasPrevious(
                                roadmaps
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<RoadmapResponse>>builder()

                .success(true)

                .message(
                        "Roadmaps by level fetched successfully"
                )

                .data(
                        roadmaps.getContent()
                )

                .meta(meta)

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
                        "Roadmap deleted successfully"
                )

                .data(
                        roadmapService.delete(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}