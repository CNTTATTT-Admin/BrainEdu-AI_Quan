package com.brainedu.BrainEdu.dto.request.RoadmapRequest;

import lombok.*;

@Getter
@Setter
public class AddRoadmapCourseRequest {

    private Long courseId;

    private Integer orderIndex;

    private Boolean requiredCourse;

    private Integer estimatedWeek;
}
