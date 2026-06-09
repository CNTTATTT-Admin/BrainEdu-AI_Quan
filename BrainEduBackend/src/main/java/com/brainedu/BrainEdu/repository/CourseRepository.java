package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository
        extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {

    Page<Course> findByCategoryId(
            Long categoryId,
            Pageable pageable
    );

    List<Course> findByInstructorId(
            Long instructorId
    );

    @Query(value = """
        SELECT 
            main_c.id AS courseId,
            main_c.title AS courseTitle,
            main_c.thumbnail AS courseThumbnail,
            main_c.price AS coursePrice,
            main_i.name AS instructorName,
            stats.totalStudentsEnrolled,
            stats.averageRating,
            stats.totalReviews
        FROM (
            SELECT 
                c.id AS course_id,
                COUNT(DISTINCT e.id) AS totalStudentsEnrolled,
                COALESCE(AVG(r.rating), 0.0) AS averageRating,
                COUNT(DISTINCT r.id) AS totalReviews
            FROM courses c
            LEFT JOIN enrollments e ON c.id = e.course_id
            LEFT JOIN course_reviews r ON c.id = r.course_id AND r.deleted = false
            WHERE c.status = 'PUBLISHED' AND c.deleted = false
            GROUP BY c.id
            ORDER BY totalStudentsEnrolled DESC, averageRating DESC
        ) AS stats
        JOIN courses main_c ON main_c.id = stats.course_id
        LEFT JOIN users main_i ON main_c.instructor_id = main_i.id
        """,
        countQuery = """
        SELECT COUNT(c.id) FROM courses c WHERE c.status = 'PUBLISHED' AND c.deleted = false
        """,
        nativeQuery = true)
    Page<Object[]> findTopCoursesOverview(Pageable pageable);
}