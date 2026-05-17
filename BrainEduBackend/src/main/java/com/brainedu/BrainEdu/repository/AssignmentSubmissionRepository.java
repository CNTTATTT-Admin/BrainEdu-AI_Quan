package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AssignmentSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentSubmissionRepository
        extends JpaRepository<
                AssignmentSubmission,
                Long
                > {

    Page<AssignmentSubmission>
    findByAssignmentId(
            Long assignmentId,
            Pageable pageable);

    Page<AssignmentSubmission>
    findByStudentId(Long studentId, Pageable pageable);
}