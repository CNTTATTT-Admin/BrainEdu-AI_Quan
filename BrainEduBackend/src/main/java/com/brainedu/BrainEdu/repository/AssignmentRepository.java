package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository
        extends JpaRepository<Assignment, Long> {

    List<Assignment> findByInstructorId(
            Long instructorId
    );

    List<Assignment> findByCourseId(
            Long courseId
    );
}