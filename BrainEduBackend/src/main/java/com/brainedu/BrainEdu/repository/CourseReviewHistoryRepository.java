package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.CourseReviewHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseReviewHistoryRepository extends JpaRepository<CourseReviewHistory, Long> {
}