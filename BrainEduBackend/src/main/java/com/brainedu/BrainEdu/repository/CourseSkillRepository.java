package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.CourseSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseSkillRepository
        extends JpaRepository<CourseSkill, Long> {

    List<CourseSkill> findByCourseId(
            Long courseId
    );

    List<CourseSkill> findBySkillId(
            Long skillId
    );

    Optional<CourseSkill>
    findByCourseIdAndSkillId(
            Long courseId,
            Long skillId
    );
}