package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.*;
import com.brainedu.BrainEdu.entity.UserLearningPath;
import org.springframework.stereotype.Component;

@Component
public class UserLearningPathMapper {

    public UserLearningPathResponse toResponse(
            UserLearningPath learningPath
    ) {

        return UserLearningPathResponse.builder()

                .id(
                        learningPath.getId()
                )

                .userId(
                        learningPath.getUser()
                                .getId()
                )

                .userName(
                        learningPath.getUser()
                                .getName()
                )

                .courseId(
                        learningPath.getCourse()
                                .getId()
                )

                .courseTitle(
                        learningPath.getCourse()
                                .getTitle()
                )

                .roadmapId(
                        learningPath.getRoadmap()
                                .getId()
                )

                .roadmapName(
                        learningPath.getRoadmap()
                                .getRoadmapName()
                )

                .recommendationScore(
                        learningPath.getRecommendationScore()
                )

                .status(
                        learningPath.getStatus()
                )

                .recommendedReason(
                        learningPath.getRecommendedReason()
                )

                .aiGenerated(
                        learningPath.getAiGenerated()
                )

                .createdAt(
                        learningPath.getCreatedAt()
                )

                .build();
    }
}