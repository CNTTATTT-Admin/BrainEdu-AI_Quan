package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.UserLearningPathRequest.*;
import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.*;
import com.brainedu.BrainEdu.service.userLearningPathService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-learning-paths")
@RequiredArgsConstructor
public class UserLearningPathController {

    private final UserLearningPathService
            learningPathService;

    @PostMapping
    public UserLearningPathResponse create(
            @RequestBody
            UserLearningPathRequest request
    ) {

        return learningPathService.create(
                request
        );
    }

    @GetMapping
    public List<UserLearningPathResponse> getAll() {

        return learningPathService.getAll();
    }

    @GetMapping("/{id}")
    public UserLearningPathResponse getById(
            @PathVariable Long id
    ) {

        return learningPathService.getById(id);
    }

    @GetMapping("/user/{userId}")
    public List<UserLearningPathResponse> getByUser(
            @PathVariable Long userId
    ) {

        return learningPathService.getByUser(
                userId
        );
    }

    @GetMapping("/roadmap/{roadmapId}")
    public List<UserLearningPathResponse> getByRoadmap(
            @PathVariable Long roadmapId
    ) {

        return learningPathService.getByRoadmap(
                roadmapId
        );
    }

    @GetMapping("/course/{courseId}")
    public List<UserLearningPathResponse> getByCourse(
            @PathVariable Long courseId
    ) {

        return learningPathService.getByCourse(
                courseId
        );
    }

    @PutMapping("/{id}")
    public UserLearningPathResponse update(
            @PathVariable Long id,
            @RequestBody UserLearningPathRequest request
    ) {

        return learningPathService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return learningPathService.delete(id);
    }
}