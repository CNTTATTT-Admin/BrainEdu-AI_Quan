package com.brainedu.BrainEdu.service.courseService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.brainedu.BrainEdu.common.enums.CourseStatus;
import com.brainedu.BrainEdu.dto.request.FilterRequest.CourseFilterRequest;
import com.brainedu.BrainEdu.entity.Course;

import jakarta.persistence.criteria.Predicate;

public class CourseSpecification {

    public static Specification<Course> filter(CourseFilterRequest req) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (req.getCategoryId() != null) {
                predicates.add(
                        cb.equal(root.get("category").get("id"), req.getCategoryId())
                );
            }

            if (req.getKeyword() != null) {
                predicates.add(
                        cb.like(
                                cb.lower(root.get("title")),
                                "%" + req.getKeyword().toLowerCase() + "%"
                        )
                );
            }

            if (req.getMinPrice() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(root.get("price"), req.getMinPrice())
                );
            }

            if (req.getMaxPrice() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(root.get("price"), req.getMaxPrice())
                );
            }

            predicates.add(
                cb.equal(
                        root.get("status"),
                        CourseStatus.PUBLISHED
                )
            );
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}