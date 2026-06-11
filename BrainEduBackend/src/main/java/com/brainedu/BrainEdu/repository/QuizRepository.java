package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Question;
import com.brainedu.BrainEdu.entity.Quiz;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizRepository
        extends JpaRepository<Quiz, Long> {

    Page<Quiz> findByLessonId(
            Long lessonId,
            Pageable pageable
    );
    @Query("SELECT q FROM Question q WHERE q.quiz.id = :quizId")
    List<Question> findByQuizId(@Param("quizId") Long quizId);

}