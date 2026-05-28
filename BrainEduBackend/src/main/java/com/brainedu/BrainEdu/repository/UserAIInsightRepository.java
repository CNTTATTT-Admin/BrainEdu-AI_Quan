package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.UserAIInsight;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAIInsightRepository
        extends JpaRepository<
        UserAIInsight,
        Long
        > {

    List<UserAIInsight>
    findByUserIdOrderByCreatedAtDesc(
            Long userId
    );

    Optional<UserAIInsight>
    findByTypeAndReferenceId(
            String type,
            Long referenceId
    );

}
