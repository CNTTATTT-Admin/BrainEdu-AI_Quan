package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.QuizSubmission;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

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

    @Query("""
        SELECT DISTINCT qs
        FROM QuizSubmission qs
        LEFT JOIN FETCH qs.quiz qz
        LEFT JOIN FETCH qs.answers ua
        LEFT JOIN FETCH ua.question q
        LEFT JOIN FETCH ua.selectedAnswer sa
        WHERE qs.id = :id
        AND qs.user.id = :userId
    """)
    Optional<QuizSubmission>
    findReviewByIdAndUserId(

            @Param("id")
            Long id,

            @Param("userId")
            Long userId
    );

    boolean existsByUserIdAndQuizId(Long userId, Long quizId);
        Optional<QuizSubmission>
        findByUserIdAndQuizId(
                Long userId,
                Long quizId
        );
}
