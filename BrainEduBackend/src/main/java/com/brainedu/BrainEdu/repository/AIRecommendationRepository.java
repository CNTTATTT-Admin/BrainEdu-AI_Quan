package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AIRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AIRecommendationRepository
        extends JpaRepository<AIRecommendation, Long> {

    List<AIRecommendation> findByUserId(
            Long userId
    );

    List<AIRecommendation> findByRecommendationType(
            String recommendationType
    );
}