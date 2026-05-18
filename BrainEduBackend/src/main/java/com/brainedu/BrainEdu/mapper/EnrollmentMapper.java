package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.EnrollmentResponse.EnrollmentResponse;
import com.brainedu.BrainEdu.entity.Enrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {

    @Mapping(
            target = "userId",
            source = "user.id"
    )
    @Mapping(
            target = "userName",
            source = "user.name"
    )
    @Mapping(
            target = "courseId",
            source = "course.id"
    )
    @Mapping(
            target = "courseTitle",
            source = "course.title"
    )
    EnrollmentResponse toResponse(
            Enrollment enrollment
    );
}