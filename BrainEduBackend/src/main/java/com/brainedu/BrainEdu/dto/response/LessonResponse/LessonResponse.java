package com.brainedu.BrainEdu.dto.response.LessonResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LessonResponse {

    private Long id;

    private Long courseId;

    private String courseTitle;

    private String title;

    private String content;

    private String videoUrl;

    private Integer lessonOrder;

    private Integer estimatedTime;

    private String difficulty;
}