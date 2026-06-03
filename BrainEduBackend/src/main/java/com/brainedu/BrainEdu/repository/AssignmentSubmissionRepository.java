package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AssignmentSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

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
}