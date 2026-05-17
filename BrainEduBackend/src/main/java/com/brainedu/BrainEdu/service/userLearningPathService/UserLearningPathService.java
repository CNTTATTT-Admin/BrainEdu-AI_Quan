package com.brainedu.BrainEdu.service.userLearningPathService;

import com.brainedu.BrainEdu.dto.request.UserLearningPathRequest.*;
import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserLearningPathService {

    UserLearningPathResponse create(
            UserLearningPathRequest request
    );

    Page<UserLearningPathResponse> getAll(int page, int size);

    UserLearningPathResponse getById(
            Long id
    );

    Page<UserLearningPathResponse> getByUser(
            Long userId,
            int page,
            int size
    );

    Page<UserLearningPathResponse> getByRoadmap(
            Long roadmapId,
            int page,
            int size
    );

    Page<UserLearningPathResponse> getByCourse(
            Long courseId,
            int page,
            int size
    );

    UserLearningPathResponse update(
            Long id,
            UserLearningPathRequest request
    );

    String delete(
            Long id
    );
}