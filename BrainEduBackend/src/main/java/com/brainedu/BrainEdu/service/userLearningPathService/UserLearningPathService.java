package com.brainedu.BrainEdu.service.userLearningPathService;

import com.brainedu.BrainEdu.dto.request.UserLearningPathRequest.*;
import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.*;

import java.util.List;

public interface UserLearningPathService {

    UserLearningPathResponse create(
            UserLearningPathRequest request
    );

    List<UserLearningPathResponse> getAll();

    UserLearningPathResponse getById(
            Long id
    );

    List<UserLearningPathResponse> getByUser(
            Long userId
    );

    List<UserLearningPathResponse> getByRoadmap(
            Long roadmapId
    );

    List<UserLearningPathResponse> getByCourse(
            Long courseId
    );

    UserLearningPathResponse update(
            Long id,
            UserLearningPathRequest request
    );

    String delete(
            Long id
    );
}