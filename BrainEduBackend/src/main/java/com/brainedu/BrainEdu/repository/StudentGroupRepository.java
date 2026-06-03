package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.StudentGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGroupRepository
        extends JpaRepository<StudentGroup, Long> {

    List<StudentGroup>
    findByCourseId(Long courseId);

}