package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.UserLearningPathRequest.UserLearningPathRequest;
import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.UserLearningPathResponse;
import com.brainedu.BrainEdu.service.userLearningPathService.UserLearningPathService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user-learning-paths")
@RequiredArgsConstructor
public class UserLearningPathController {

    private final UserLearningPathService
            learningPathService;

    @PostMapping
    public ApiResponse<UserLearningPathResponse>
    create(
            @RequestBody
            UserLearningPathRequest request
    ) {

        return ApiResponse
                .<UserLearningPathResponse>builder()

                .success(true)

                .message(
                        "User learning path created successfully"
                )

                .data(
                        learningPathService.create(
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
    public ApiResponse<List<UserLearningPathResponse>>
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

        Page<UserLearningPathResponse> learningPaths =
                learningPathService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                learningPaths.getNumber()
                        )

                        .size(
                                learningPaths.getSize()
                        )

                        .totalElements(
                                learningPaths
                                        .getTotalElements()
                        )

                        .totalPages(
                                learningPaths
                                        .getTotalPages()
                        )

                        .hasNext(
                                learningPaths.hasNext()
                        )

                        .hasPrevious(
                                learningPaths
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserLearningPathResponse>>builder()

                .success(true)

                .message(
                        "User learning paths fetched successfully"
                )

                .data(
                        learningPaths.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<UserLearningPathResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<UserLearningPathResponse>builder()

                .success(true)

                .message(
                        "User learning path fetched successfully"
                )

                .data(
                        learningPathService.getById(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<UserLearningPathResponse>>
    getByUser(

            @PathVariable Long userId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserLearningPathResponse> learningPaths =
                learningPathService.getByUser(
                        userId,
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                learningPaths.getNumber()
                        )

                        .size(
                                learningPaths.getSize()
                        )

                        .totalElements(
                                learningPaths
                                        .getTotalElements()
                        )

                        .totalPages(
                                learningPaths
                                        .getTotalPages()
                        )

                        .hasNext(
                                learningPaths.hasNext()
                        )

                        .hasPrevious(
                                learningPaths
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserLearningPathResponse>>builder()

                .success(true)

                .message(
                        "User learning paths by user fetched successfully"
                )

                .data(
                        learningPaths.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/roadmap/{roadmapId}")
    public ApiResponse<List<UserLearningPathResponse>>
    getByRoadmap(

            @PathVariable Long roadmapId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserLearningPathResponse> learningPaths =
                learningPathService.getByRoadmap(
                        roadmapId,
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                learningPaths.getNumber()
                        )

                        .size(
                                learningPaths.getSize()
                        )

                        .totalElements(
                                learningPaths
                                        .getTotalElements()
                        )

                        .totalPages(
                                learningPaths
                                        .getTotalPages()
                        )

                        .hasNext(
                                learningPaths.hasNext()
                        )

                        .hasPrevious(
                                learningPaths
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserLearningPathResponse>>builder()

                .success(true)

                .message(
                        "User learning paths by roadmap fetched successfully"
                )

                .data(
                        learningPaths.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<List<UserLearningPathResponse>>
    getByCourse(

            @PathVariable Long courseId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserLearningPathResponse> learningPaths =
                learningPathService.getByCourse(
                        courseId,
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                learningPaths.getNumber()
                        )

                        .size(
                                learningPaths.getSize()
                        )

                        .totalElements(
                                learningPaths
                                        .getTotalElements()
                        )

                        .totalPages(
                                learningPaths
                                        .getTotalPages()
                        )

                        .hasNext(
                                learningPaths.hasNext()
                        )

                        .hasPrevious(
                                learningPaths
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserLearningPathResponse>>builder()

                .success(true)

                .message(
                        "User learning paths by course fetched successfully"
                )

                .data(
                        learningPaths.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserLearningPathResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            UserLearningPathRequest request
    ) {

        return ApiResponse
                .<UserLearningPathResponse>builder()

                .success(true)

                .message(
                        "User learning path updated successfully"
                )

                .data(
                        learningPathService.update(
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
                        "User learning path deleted successfully"
                )

                .data(
                        learningPathService.delete(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}