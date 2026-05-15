package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnswerRepository
        extends JpaRepository<UserAnswer, Long> {

    List<UserAnswer> findByUserId(
            Long userId
    );

    List<UserAnswer> findByQuestionId(
            Long questionId
    );
}