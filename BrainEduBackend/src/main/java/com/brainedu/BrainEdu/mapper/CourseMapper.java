package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.CourseResponse.CourseResponse;
import com.brainedu.BrainEdu.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(
            target = "categoryId",
            source = "category.id"
    )
    @Mapping(
            target = "categoryName",
            source = "category.categoryName"
    )
    @Mapping(
            target = "instructorId",
            source = "instructor.id"
    )
    @Mapping(
            target = "instructorName",
            source = "instructor.name"
    )
    CourseResponse toResponse(
            Course course
    );
}