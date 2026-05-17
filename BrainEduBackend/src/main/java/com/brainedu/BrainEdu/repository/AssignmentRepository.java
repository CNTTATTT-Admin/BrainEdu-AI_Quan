package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Assignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository
        extends JpaRepository<Assignment, Long> {

    Page<Assignment> findByInstructorId(
            Long instructorId,
            Pageable pageable
    );

    List<Assignment> findByCourseId(
            Long courseId
    );
}