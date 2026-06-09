package com.brainedu.BrainEdu.dto.response.RoadmapResponse;

import java.util.List;

import com.brainedu.BrainEdu.dto.response.RoadmapResponse.RoadmapDetailResponse.CourseItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private String roadmapName;

    private String level;

    private String description;

    private List<CourseItem> courses;

}