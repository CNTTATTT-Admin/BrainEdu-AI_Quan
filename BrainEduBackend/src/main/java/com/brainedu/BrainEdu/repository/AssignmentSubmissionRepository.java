package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AssignmentSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentSubmissionRepository
        extends JpaRepository<
                AssignmentSubmission,
                Long
                > {

    List<AssignmentSubmission>
    findByAssignmentId(Long assignmentId);

    List<AssignmentSubmission>
    findByStudentId(Long studentId);
}