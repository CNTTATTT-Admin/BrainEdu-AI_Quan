package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;
import com.brainedu.BrainEdu.entity.AssignmentSubmission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {

    @Mapping(source = "assignment.id", target = "assignmentId")
    @Mapping(source = "assignment.title", target = "assignmentTitle")

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.name", target = "studentName")

    SubmissionResponse toResponse(AssignmentSubmission submission);
}