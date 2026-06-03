package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignmentRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentResponse;
import com.brainedu.BrainEdu.entity.Assignment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AssignmentMapper {

    Assignment toEntity(
            AssignmentRequest request
    );

    @Mapping(
            target = "courseId",
            source = "course.id"
    )
    @Mapping(
            target = "courseName",
            source = "course.title"
    )
    @Mapping(
            target = "quizId",
            source = "quiz.id"
    )
    @Mapping(
            target = "quizTitle",
            source = "quiz.title"
    )
    AssignmentResponse toResponse(
            Assignment assignment
    );
}