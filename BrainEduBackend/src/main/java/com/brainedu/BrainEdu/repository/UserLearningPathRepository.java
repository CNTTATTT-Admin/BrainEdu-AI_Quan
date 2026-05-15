package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.UserLearningPath;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLearningPathRepository
        extends JpaRepository<UserLearningPath, Long> {

    List<UserLearningPath> findByUserId(
            Long userId
    );

    List<UserLearningPath> findByRoadmapId(
            Long roadmapId
    );

    List<UserLearningPath> findByCourseId(
            Long courseId
    );
}