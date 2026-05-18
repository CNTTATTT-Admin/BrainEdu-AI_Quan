package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.UserLearningPathResponse;
import com.brainedu.BrainEdu.entity.UserLearningPath;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserLearningPathMapper {

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

    @Mapping(
            target = "roadmapId",
            source = "roadmap.id"
    )
    @Mapping(
            target = "roadmapName",
            source = "roadmap.roadmapName"
    )

    UserLearningPathResponse toResponse(
            UserLearningPath learningPath
    );
}