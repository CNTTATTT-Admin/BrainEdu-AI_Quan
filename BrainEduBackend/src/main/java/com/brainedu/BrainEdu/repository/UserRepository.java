package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.dto.response.UserResponse.InstructorResponse;
import com.brainedu.BrainEdu.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.role <> 'ADMIN'")
    Page<User> findAllExceptAdmin(Pageable pageable);

    @Query("""
        SELECT new com.brainedu.BrainEdu.dto.response.UserResponse.InstructorResponse(
            u.id,
            u.name,
            u.email,
            COUNT(DISTINCT c.id),
            COUNT(e.id),
            str(u.status)
        )
        FROM User u
        LEFT JOIN Course c ON c.instructor.id = u.id
        LEFT JOIN Enrollment e ON e.course.id = c.id
        WHERE u.role = 'INSTRUCTOR'
        GROUP BY
            u.id,
            u.name,
            u.email,
            u.status
    """)
    Page<InstructorResponse> findAllInstructors(Pageable pageable);
}