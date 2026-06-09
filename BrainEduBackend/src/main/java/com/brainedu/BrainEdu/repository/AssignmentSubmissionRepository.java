package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import com.brainedu.BrainEdu.entity.AssignmentSubmission;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AssignmentSubmissionRepository
        extends JpaRepository<
        AssignmentSubmission,
        Long> {

    List<AssignmentSubmission>
    findByAssignmentId(Long assignmentId);

    List<AssignmentSubmission>
    findByStudentId(Long studentId);

    Optional<AssignmentSubmission>
    findByAssignmentIdAndStudentId(
            Long assignmentId,
            Long studentId
    );

    @Query("""
        SELECT sub 
        FROM AssignmentSubmission sub
        JOIN sub.assignment a
        JOIN a.course c
        WHERE a.instructor.id = :instructorId
          AND sub.status = :status
          AND a.deleted = false
        ORDER BY sub.submittedAt ASC
    """)
    List<AssignmentSubmission> findPendingSubmissionsByInstructor(
            @Param("instructorId") Long instructorId, 
            @Param("status") SubmissionStatus status
    );
}