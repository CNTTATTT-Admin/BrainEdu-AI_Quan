package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository
        extends JpaRepository<Quiz, Long> {

    Page<Quiz> findByLessonId(
            Long lessonId,
            Pageable pageable
    );


}