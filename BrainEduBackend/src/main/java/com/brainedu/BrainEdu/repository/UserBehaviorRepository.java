package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.UserBehavior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBehaviorRepository
        extends JpaRepository<UserBehavior, Long> {
}