package com.brainedu.BrainEdu.dto.request.LessonRequest;

import lombok.Data;

@Data
public class CreateLessonRequest {

    private Long courseId;

    private String title;

    private String videoUrl;

    private String content;

    private Integer orderIndex;
}