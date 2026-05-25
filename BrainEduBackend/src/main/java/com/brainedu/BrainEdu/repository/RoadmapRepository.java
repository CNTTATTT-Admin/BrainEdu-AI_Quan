package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Roadmap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

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

        @Query("""
        SELECT DISTINCT r
        FROM Roadmap r
        LEFT JOIN FETCH r.category
        LEFT JOIN FETCH r.roadmapCourses rc
        LEFT JOIN FETCH rc.course c
        LEFT JOIN FETCH c.instructor
        WHERE r.id = :id
        """)
        Optional<Roadmap> findDetailById(
                @Param("id")
                Long id
        );

}
