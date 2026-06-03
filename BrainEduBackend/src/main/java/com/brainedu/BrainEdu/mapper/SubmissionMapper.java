package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AssignmentResponse.SubmissionResponse;
import com.brainedu.BrainEdu.entity.AssignmentSubmission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {

    SubmissionResponse toResponse(
            AssignmentSubmission submission
    );
}