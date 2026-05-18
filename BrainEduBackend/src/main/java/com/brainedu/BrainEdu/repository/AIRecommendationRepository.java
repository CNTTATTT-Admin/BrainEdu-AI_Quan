package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AIRecommendation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AIRecommendationRepository
        extends JpaRepository<AIRecommendation, Long> {

    Page<AIRecommendation> findByUserId(
            Long userId,
            Pageable pageable
    );

    Page<AIRecommendation> findByRecommendationType(
            String recommendationType,
            Pageable pageable
    );
}