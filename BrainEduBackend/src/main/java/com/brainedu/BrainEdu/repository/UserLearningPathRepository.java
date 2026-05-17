package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.UserLearningPath;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLearningPathRepository
        extends JpaRepository<UserLearningPath, Long> {

    Page<UserLearningPath> findByUserId(
            Long userId,
            Pageable pageable
    );

    Page<UserLearningPath> findByRoadmapId(
            Long roadmapId,
            Pageable pageable
    );

    Page<UserLearningPath> findByCourseId(
            Long courseId,
            Pageable pageable
    );
}