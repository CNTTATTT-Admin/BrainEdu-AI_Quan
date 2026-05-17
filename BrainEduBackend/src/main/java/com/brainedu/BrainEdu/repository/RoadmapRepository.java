package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Roadmap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoadmapRepository
        extends JpaRepository<Roadmap, Long> {

    Page<Roadmap> findByCategoryId(
            Long categoryId,
            Pageable pageable
    );

    Page<Roadmap> findByLevel(
            String level,
            Pageable pageable
    );
}