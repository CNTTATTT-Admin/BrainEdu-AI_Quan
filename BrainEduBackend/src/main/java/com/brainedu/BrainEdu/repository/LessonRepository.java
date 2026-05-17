package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository
        extends JpaRepository<Lesson, Long> {

    Page<Lesson> findByCourseIdOrderByLessonOrderAsc(
            Long courseId,
            Pageable pageable
    );
}