package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
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

        return ResponseFactory.success(
                "User learning path created successfully",
                learningPathService.create(request)
        );
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

        return ResponseFactory.success(
                "User learning paths fetched successfully",
                learningPaths.getContent(),
                ResponseFactory.pagination(
                        learningPaths
                )
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<UserLearningPathResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "User learning path fetched successfully",
                learningPathService.getById(id)
        );
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

        return ResponseFactory.success(
                "User learning paths by user fetched successfully",
                learningPaths.getContent(),
                ResponseFactory.pagination(
                        learningPaths
                )
        );
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

        return ResponseFactory.success(
                "User learning paths by roadmap fetched successfully",
                learningPaths.getContent(),
                ResponseFactory.pagination(
                        learningPaths
                )
        );
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

        return ResponseFactory.success(
                "User learning paths by course fetched successfully",
                learningPaths.getContent(),
                ResponseFactory.pagination(
                        learningPaths
                )
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<UserLearningPathResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            UserLearningPathRequest request
    ) {

        return ResponseFactory.success(
                "User learning path updated successfully",
                learningPathService.update(
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
                "User learning path deleted successfully",
                learningPathService.delete(id)
        );
    }
}