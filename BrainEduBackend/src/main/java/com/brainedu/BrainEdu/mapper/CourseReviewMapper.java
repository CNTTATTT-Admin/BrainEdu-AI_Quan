package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import com.brainedu.BrainEdu.entity.CourseReview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CourseReviewMapper {

    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseTitle", source = "course.title")
    @Mapping(target = "studentId", source = "user.id")
    @Mapping(target = "studentName", source = "user.name")
    CourseReviewResponse toResponse(CourseReview review);
}