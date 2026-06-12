package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Question;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    Page<Question> findBySkillId(
            Long skillId,
            Pageable pageable
    );

    Optional<Question>
    findByIdAndQuizId(
            Long questionId,
            Long quizId
    );

    int countByQuizId(
            Long quizId
    );

    List<Question> findByQuizId(
            Long quizId
    );
        @Query("SELECT q FROM Question q JOIN FETCH q.answers WHERE q.quiz.id = :quizId")
        List<Question> findAllWithAnswersByQuizId(@Param("quizId") Long quizId);
}