package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.AssignmentRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
}