package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.LessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonProgressRepository
        extends JpaRepository<LessonProgress, Long> {

    List<LessonProgress> findByUserId(
            Long userId
    );

    List<LessonProgress> findByLessonId(
            Long lessonId
    );

    Optional<LessonProgress>
    findByUserIdAndLessonId(
            Long userId,
            Long lessonId
    );
}