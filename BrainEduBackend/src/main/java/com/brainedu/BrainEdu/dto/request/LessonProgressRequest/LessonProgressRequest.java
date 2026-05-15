package com.brainedu.BrainEdu.dto.request.LessonProgressRequest;

import lombok.Data;

@Data
public class LessonProgressRequest {

    private Long lessonId;

    private Float progressPercent;

    private Integer learningTime;

    private Boolean completed;
}