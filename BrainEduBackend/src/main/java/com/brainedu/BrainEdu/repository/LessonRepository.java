package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Lesson;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessonRepository
        extends JpaRepository<Lesson, Long> {

    Page<Lesson> findByCourseIdOrderByLessonOrderAsc(
            Long courseId,
            Pageable pageable
    );

    int countByCourseId(
            Long courseId
    );

    List<Lesson> findByCourseIdOrderByLessonOrderAsc(
            Long courseId
    );

    @Query("""
        SELECT l
        FROM Lesson l
        WHERE l.course.id = :courseId
        AND l.id NOT IN (
                SELECT lp.lesson.id
                FROM LessonProgress lp
                WHERE lp.user.id = :userId
                AND lp.completed = true
        )
        ORDER BY l.lessonOrder ASC
        """)
        List<Lesson> findRemainingLessons(
                @Param("userId") Long userId,
                @Param("courseId") Long courseId,
                Pageable pageable
        );
}