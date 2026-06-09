package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Enrollment;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Enrollment, Long> {

    public interface KpiProjection {
        Long getTotalCourses();
        Long getCurrentMonthUsers();
        Double getUserGrowthPercent();
        Long getCurrentMonthInstructors();
        Double getInstructorGrowthPercent();
        Double getCurrentMonthRevenue();
        Double getRevenueGrowthPercent();
    }

    public interface WeeklyRevenueProjection {
        String getLabel();
        Double getAmount();
        Double getPercentage();
    }

    public interface InstructorStatsProjection {
        Long getTotalCourses();
        Long getTotalStudents();
        Long getPendingAssignments();
    }

    @Query(value = """
        WITH current_month_range AS (
            SELECT 
                DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-01') AS cur_month,
                DATE_FORMAT(DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 MONTH), '%Y-%m-01') AS prev_month
        ),
        user_counts AS (
            SELECT
                SUM(CASE WHEN u.role = 'USER' AND COALESCE(u.created_at, '1970-01-01') < (SELECT cur_month FROM current_month_range) THEN 1 ELSE 0 END) AS users_until_prev_month,
                SUM(CASE WHEN u.role = 'USER' AND COALESCE(u.created_at, '1970-01-01') < DATE_ADD((SELECT cur_month FROM current_month_range), INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS users_until_cur_month,
                SUM(CASE WHEN u.role = 'INSTRUCTOR' AND COALESCE(u.created_at, '1970-01-01') < (SELECT cur_month FROM current_month_range) THEN 1 ELSE 0 END) AS instructors_until_prev_month,
                SUM(CASE WHEN u.role = 'INSTRUCTOR' AND COALESCE(u.created_at, '1970-01-01') < DATE_ADD((SELECT cur_month FROM current_month_range), INTERVAL 1 MONTH) THEN 1 ELSE 0 END) AS instructors_until_cur_month
            FROM users u
        ),
        revenue_by_month AS (
            SELECT
                SUM(CASE WHEN e.enrolled_at >= (SELECT prev_month FROM current_month_range) AND e.enrolled_at < (SELECT cur_month FROM current_month_range) THEN COALESCE(c.price, 0) ELSE 0 END) AS prev_month_revenue,
                SUM(CASE WHEN e.enrolled_at >= (SELECT cur_month FROM current_month_range) AND e.enrolled_at < DATE_ADD((SELECT cur_month FROM current_month_range), INTERVAL 1 MONTH) THEN COALESCE(c.price, 0) ELSE 0 END) AS cur_month_revenue
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
        )
        SELECT
            (SELECT COUNT(id) FROM courses WHERE deleted = false) AS totalCourses,
            uc.users_until_cur_month AS currentMonthUsers,
            CASE 
                WHEN uc.users_until_prev_month = 0 THEN 0
                ELSE ROUND(((uc.users_until_cur_month - uc.users_until_prev_month) / uc.users_until_prev_month) * 100, 2)
            END AS userGrowthPercent,
            uc.instructors_until_cur_month AS currentMonthInstructors,
            CASE 
                WHEN uc.instructors_until_prev_month = 0 THEN 0
                ELSE ROUND(((uc.instructors_until_cur_month - uc.instructors_until_prev_month) / uc.instructors_until_prev_month) * 100, 2)
            END AS instructorGrowthPercent,
            r.cur_month_revenue AS currentMonthRevenue,
            CASE 
                WHEN r.prev_month_revenue = 0 THEN 0
                ELSE ROUND(((r.cur_month_revenue - r.prev_month_revenue) / r.prev_month_revenue) * 100, 2)
            END AS revenueGrowthPercent
        FROM user_counts uc
        CROSS JOIN revenue_by_month r
    """, nativeQuery = true)
    KpiProjection getDashboardKpi();

    @Query(value = """
        WITH current_month_enrollments AS (
            SELECT 
                e.id,
                COALESCE(c.price, 0) AS course_price,
                EXTRACT(DAY FROM e.enrolled_at) AS enroll_day
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            WHERE e.enrolled_at >= STR_TO_DATE(DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-01'), '%Y-%m-%d')
            AND e.enrolled_at < STR_TO_DATE(DATE_FORMAT(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 MONTH), '%Y-%m-01'), '%Y-%m-%d')
        ),
        weekly_partition AS (
            SELECT
                CASE 
                    WHEN enroll_day BETWEEN 1 AND 7 THEN 'Tuần 1'
                    WHEN enroll_day BETWEEN 8 AND 14 THEN 'Tuần 2'
                    WHEN enroll_day BETWEEN 15 AND 21 THEN 'Tuần 3'
                    ELSE 'Tuần 4'
                END AS week_label,
                SUM(course_price) AS week_revenue
            FROM current_month_enrollments
            GROUP BY 
                CASE 
                    WHEN enroll_day BETWEEN 1 AND 7 THEN 'Tuần 1'
                    WHEN enroll_day BETWEEN 8 AND 14 THEN 'Tuần 2'
                    WHEN enroll_day BETWEEN 15 AND 21 THEN 'Tuần 3'
                    ELSE 'Tuần 4'
                END
        ),
        total_monthly_revenue AS (
            SELECT SUM(week_revenue) AS total_month_amount FROM weekly_partition
        )
        SELECT 
            w.week_label AS label,
            w.week_revenue AS amount,
            CASE 
                WHEN t.total_month_amount = 0 THEN 0
                ELSE ROUND((w.week_revenue / t.total_month_amount * 100), 2)
            END AS percentage
        FROM weekly_partition w
        CROSS JOIN total_monthly_revenue t
        ORDER BY w.week_label
    """, nativeQuery = true)
    List<WeeklyRevenueProjection> getWeeklyRevenueAnalysis();

    @Query(value = """
        SELECT 
            (SELECT COUNT(c.id) 
             FROM courses c 
             WHERE c.instructor_id = :instructorId AND c.deleted = false) AS totalCourses,
             
            (SELECT COUNT(e.id) 
             FROM enrollments e
             JOIN courses c ON e.course_id = c.id
             WHERE c.instructor_id = :instructorId AND c.deleted = false) AS totalStudents,
             
            (SELECT COUNT(sub.id) 
             FROM assignment_submissions sub
             JOIN assignments a ON sub.assignment_id = a.id
             WHERE a.instructor_id = :instructorId AND sub.status = 'SUBMITTED' AND a.deleted = false) AS pendingAssignments
    """, nativeQuery = true)
    InstructorStatsProjection getInstructorDashboardStats(@Param("instructorId") Long instructorId);

}