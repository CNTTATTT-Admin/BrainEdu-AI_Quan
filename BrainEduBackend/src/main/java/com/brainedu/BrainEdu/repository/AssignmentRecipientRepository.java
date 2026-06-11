package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AssignmentRecipient;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignmentRecipientRepository
        extends JpaRepository<
                AssignmentRecipient,
                Long> {

    List<AssignmentRecipient>
    findByAssignmentId(Long assignmentId);

    List<AssignmentRecipient>
    findByStudentId(Long studentId);

    boolean existsByAssignmentIdAndStudentId(
            Long assignmentId,
            Long studentId
    );

    @Query("SELECT r FROM AssignmentRecipient r JOIN r.assignment a WHERE r.student.id = :studentId AND a.status = 'PUBLISHED'")
        List<AssignmentRecipient> findPublishedByStudentId(@Param("studentId") Long studentId);
}