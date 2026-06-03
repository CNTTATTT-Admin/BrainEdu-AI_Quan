package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.StudentGroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGroupMemberRepository
        extends JpaRepository<
                StudentGroupMember,
                Long> {

    List<StudentGroupMember>
    findByGroupId(Long groupId);

    List<StudentGroupMember>
    findByStudentId(Long studentId);

    boolean existsByGroupIdAndStudentId(
            Long groupId,
            Long studentId
    );
}