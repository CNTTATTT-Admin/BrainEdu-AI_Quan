package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoadmapRepository
        extends JpaRepository<Roadmap, Long> {

    List<Roadmap> findByCategoryId(
            Long categoryId
    );

    List<Roadmap> findByLevel(
            String level
    );
}