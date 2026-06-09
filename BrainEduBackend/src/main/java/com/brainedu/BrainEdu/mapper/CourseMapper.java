package com.brainedu.BrainEdu.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.brainedu.BrainEdu.dto.response.CourseResponse.CourseResponse;
import com.brainedu.BrainEdu.entity.Course;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(target = "categoryId", source = "course.category.id")
    @Mapping(target = "categoryName", source = "course.category.categoryName")
    @Mapping(target = "instructorId", source = "course.instructor.id")
    @Mapping(target = "instructorName", source = "course.instructor.name")
    @Mapping(target = "isEnrolled", source = "isEnrolled")
    @Mapping(target = "totalEnrolled", ignore = true)
    @Mapping(target = "totalLessons", ignore = true)
    CourseResponse toResponse(Course course, boolean isEnrolled);

    @Mapping(target = "categoryId", source = "course.category.id")
    @Mapping(target = "categoryName", source = "course.category.categoryName")
    @Mapping(target = "instructorId", source = "course.instructor.id")
    @Mapping(target = "instructorName", source = "course.instructor.name")
    @Mapping(target = "isEnrolled", source = "isEnrolled")
    @Mapping(target = "totalEnrolled", source = "totalEnrolled")
    @Mapping(target = "totalLessons", ignore = true)
    CourseResponse toResponse(Course course, boolean isEnrolled, Long totalEnrolled);

    @Mapping(target = "categoryId", source = "course.category.id")
    @Mapping(target = "categoryName", source = "course.category.categoryName")
    @Mapping(target = "instructorId", source = "course.instructor.id")
    @Mapping(target = "instructorName", source = "course.instructor.name")
    @Mapping(target = "isEnrolled", source = "isEnrolled")
    @Mapping(target = "totalEnrolled", source = "totalEnrolled")
    @Mapping(target = "totalLessons", source = "totalLessons")
    CourseResponse toResponse(Course course, boolean isEnrolled, Long totalEnrolled, int totalLessons);
}