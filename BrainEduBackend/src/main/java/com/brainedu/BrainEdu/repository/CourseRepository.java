package com.brainedu.BrainEdu.repository;

import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository
        extends JpaRepository<Course, Long> {

    Page<Course> findByCategoryId(
            Long categoryId,
            Pageable pageable
    );

    List<Course> findByInstructorId(
            Long instructorId
    );

}