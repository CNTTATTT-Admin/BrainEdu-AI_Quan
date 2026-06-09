package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.dto.response.UserResponse.InstructorResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.TopStudentResponse;
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

    @Query(value = """
    SELECT 
        u.id AS studentId,
        u.name AS studentName,
        u.avatar AS studentAvatar,
        
        COALESCE(e.avg_completion, 0) AS averageCompletionPercent,
        COALESCE(asub.avg_score, 0) AS averageAssignmentScore,
        COALESCE(qsub.avg_score, 0) AS averageQuizScore,
        COALESCE(lc.completed_courses, 0) AS completedCourses,
        COALESCE(lp.total_time, 0) AS totalLearningTime,
        COALESCE(lp.completed_lessons, 0) AS completedLessons,
        COALESCE(e.enrolled_courses, 0) AS enrolledCourses,
        COALESCE(qsub.total_quizzes_taken, 0) AS totalQuizzesTaken,
        
        (
            COALESCE(e.avg_completion, 0) * 0.30
            + COALESCE(asub.avg_score, 0) * 10 * 0.25
            + COALESCE(qsub.avg_score, 0) * 10 * 0.25
            + COALESCE(lc.completed_courses, 0) * 2 * 0.10
            + LEAST(COALESCE(lp.total_time, 0) / 3600.0, 50) * 0.10
        ) AS overallPerformanceScore
        
    FROM users u
    
    LEFT JOIN (
        SELECT 
            en.user_id,
            AVG(en.completion_percent) AS avg_completion,
            COUNT(DISTINCT en.id) AS enrolled_courses
        FROM enrollments en
        WHERE en.status = 'ACTIVE'
        GROUP BY en.user_id
    ) e ON u.id = e.user_id

    LEFT JOIN (
        SELECT 
            summary.user_id,
            COUNT(CASE WHEN summary.user_completed = summary.total_lessons THEN 1 END) AS completed_courses
        FROM (
            SELECT 
                lp_inner.user_id, 
                l_inner.course_id, 
                COUNT(DISTINCT lp_inner.lesson_id) AS user_completed,
                COALESCE(l_total.total_lessons, 0) AS total_lessons
            FROM lesson_progress lp_inner
            JOIN lessons l_inner ON lp_inner.lesson_id = l_inner.id
            LEFT JOIN (
                SELECT course_id, COUNT(id) AS total_lessons 
                FROM lessons 
                WHERE deleted = false
                GROUP BY course_id
            ) l_total ON l_inner.course_id = l_total.course_id
            WHERE lp_inner.completed = true
            GROUP BY lp_inner.user_id, l_inner.course_id, l_total.total_lessons
        ) summary
        GROUP BY summary.user_id
    ) lc ON u.id = lc.user_id
    
    LEFT JOIN (
        SELECT 
            sub.student_id,
            AVG(sub.score) AS avg_score
        FROM assignment_submissions sub
        WHERE sub.status = 'GRADED'
        GROUP BY sub.student_id
    ) asub ON u.id = asub.student_id
    
    LEFT JOIN (
        SELECT 
            q.user_id,
            AVG(q.score) AS avg_score,
            COUNT(DISTINCT q.id) AS total_quizzes_taken
        FROM quiz_submissions q
        GROUP BY q.user_id
    ) qsub ON u.id = qsub.user_id
    
    LEFT JOIN (
        SELECT 
            prog.user_id,
            SUM(prog.learning_time) AS total_time,
            COUNT(DISTINCT CASE WHEN prog.completed = true THEN prog.id END) AS completed_lessons
        FROM lesson_progress prog
        GROUP BY prog.user_id
    ) lp ON u.id = lp.user_id
    
    WHERE u.role = 'USER' AND u.deleted = false
    ORDER BY overallPerformanceScore DESC
    """,
    countQuery = """
    SELECT COUNT(u.id) FROM users u WHERE u.role = 'USER' AND u.deleted = false
    """,
    nativeQuery = true)
Page<Object[]> findTopStudentsOverview(Pageable pageable);

    @Query(value = """
        SELECT 
            u.id AS instructorId,
            u.name AS instructorName,
            u.avatar AS instructorAvatar,
            COUNT(DISTINCT c.id) AS totalCourses,
            COUNT(e.id) AS totalStudentsEnrolled
        FROM users u
        LEFT JOIN courses c ON u.id = c.instructor_id AND c.deleted = false
        LEFT JOIN enrollments e ON c.id = e.course_id
        WHERE u.role = 'INSTRUCTOR' AND u.deleted = false
        GROUP BY u.id, u.name, u.avatar
        ORDER BY totalStudentsEnrolled DESC, totalCourses DESC
        """,
        countQuery = """
        SELECT COUNT(u.id) FROM users u WHERE u.role = 'INSTRUCTOR' AND u.deleted = false
        """,
        nativeQuery = true)
        Page<Object[]> findTopInstructorsOverview(Pageable pageable);
}