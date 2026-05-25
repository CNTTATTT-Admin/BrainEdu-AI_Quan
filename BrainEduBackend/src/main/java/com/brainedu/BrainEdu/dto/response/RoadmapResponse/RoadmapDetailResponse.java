package com.brainedu.BrainEdu.dto.response.RoadmapResponse;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapDetailResponse {

    private Long id;

    private String roadmapName;

    private String level;

    private String description;

    private Long categoryId;

    private String categoryName;

    private Integer totalCourses;

    private List<CourseItem> courses;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseItem {

        private Long id;

        private String title;

        private String description;

        private String level;

        private Integer estimatedDuration;

        private String thumbnail;

        private Float difficultyScore;

        private Float price;

        private Long instructorId;

        private String instructorName;
    }
}
