package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository
        extends JpaRepository<Answer, Long> {

    Page<Answer> findByQuestionId(
            Long questionId,
            Pageable pageable
    );

    Optional<Answer>
    findByIdAndQuestionId(
            Long id,
            Long questionId
    );

}