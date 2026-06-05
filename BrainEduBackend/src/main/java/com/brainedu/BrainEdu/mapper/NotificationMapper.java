package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.NotificationResponse.*;
import com.brainedu.BrainEdu.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(
            target = "userId",
            source = "user.id"
    )

    @Mapping(
            target = "userEmail",
            source = "user.email"
    )

    NotificationResponse toResponse(
            Notification notification
    );
}