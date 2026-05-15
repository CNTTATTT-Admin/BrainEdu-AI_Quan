package com.brainedu.BrainEdu.dto.request.LessonRequest;

import lombok.Data;

@Data
public class LessonRequest {

    private Long courseId;

    private String title;

    private String content;

    private String videoUrl;

    private Integer lessonOrder;

    private Integer estimatedTime;

    private String difficulty;
}