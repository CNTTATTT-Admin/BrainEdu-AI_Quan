package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.UserAnswer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository
        extends JpaRepository<UserAnswer, Long> {

    Page<UserAnswer> findByUserId(
            Long userId,
            Pageable pageable
    );

    Page<UserAnswer> findByQuestionId(
            Long questionId,
            Pageable pageable
    );
}