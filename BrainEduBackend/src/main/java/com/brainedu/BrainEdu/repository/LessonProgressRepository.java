package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.LessonProgress;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    long countByUserIdAndCompletedTrue(
            Long userId
    );

    @Query("""
        SELECT COUNT(lp)
        FROM LessonProgress lp
        WHERE lp.user.id = :userId
        AND lp.completed = true
        AND lp.lesson.course.id = :courseId
        """)
        long countCompletedLessons(
                @Param("userId") Long userId,
                @Param("courseId") Long courseId
        );
}