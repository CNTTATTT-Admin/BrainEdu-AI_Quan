package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository
        extends JpaRepository<Question, Long> {

    Page<Question> findByQuizId(
            Long quizId,
            Pageable pageable
    );

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

}