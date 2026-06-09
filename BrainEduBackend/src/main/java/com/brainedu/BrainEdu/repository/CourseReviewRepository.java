package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.CourseReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CourseReviewRepository extends JpaRepository<CourseReview, Long> {
    
    Optional<CourseReview> findByCourseIdAndUserId(Long courseId, Long userId);
    
    Page<CourseReview> findByCourseId(Long courseId, Pageable pageable);
}