package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Skill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository
        extends JpaRepository<Skill, Long> {

    Page<Skill> findByCategoryId(
            Long categoryId,
            Pageable pageable
    );
}