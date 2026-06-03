package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Enrollment;
import com.brainedu.BrainEdu.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByUserId(
            Long userId
    );

    List<Enrollment> findByCourseId(
            Long courseId
    );

    Optional<Enrollment>
    findByUserIdAndCourseId(
            Long userId,
            Long courseId
    );

    @Query("""
        SELECT e.user
        FROM Enrollment e
        WHERE e.course.id = :courseId
    """)
    List<User> findStudentsByCourseId(
            @Param("courseId") Long courseId
    );

    boolean existsByUserIdAndCourseId(Long userId, Long courseId);

    Long countByCourseId(Long courseId);
}