package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentRecipientResponse;
import com.brainedu.BrainEdu.entity.AssignmentRecipient;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AssignmentRecipientMapper {

    AssignmentRecipientResponse
    toResponse(
            AssignmentRecipient recipient
    );
}