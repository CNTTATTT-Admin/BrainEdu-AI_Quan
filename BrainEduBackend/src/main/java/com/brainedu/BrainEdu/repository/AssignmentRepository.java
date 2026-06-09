package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Assignment;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignmentRepository
        extends JpaRepository<Assignment, Long> {

    List<Assignment>
    findByCourseId(Long courseId);

    List<Assignment> findByCourseIdAndCourseInstructorId(Long courseId, Long instructorId);

    List<Assignment>
    findByInstructorId(Long instructorId);

   @Query("SELECT a, (SELECT COUNT(s) FROM AssignmentSubmission s WHERE s.assignment = a) " +
        "FROM Assignment a " +
        "WHERE a.course.id = :courseId AND a.instructor.id = :instructorId")
    List<Object[]> findByCourseIdAndCourseInstructorIdWithSubmissionCount(
        @Param("courseId") Long courseId, 
        @Param("instructorId") Long instructorId
    );
}