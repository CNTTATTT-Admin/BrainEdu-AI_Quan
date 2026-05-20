package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.QuizSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizSubmissionRepository
        extends JpaRepository<QuizSubmission, Long> {

    Page<QuizSubmission> findByUserId(
            Long userId,
            Pageable pageable
    );

    Page<QuizSubmission> findByQuizId(
            Long quizId,
            Pageable pageable
    );
    Optional<QuizSubmission>
        findByIdAndUserId(
                Long id,
                Long userId
        );

}
