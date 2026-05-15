package com.brainedu.BrainEdu.dto.response.LessonProgressResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LessonProgressResponse {

    private Long id;

    private Long userId;

    private String userName;

    private Long lessonId;

    private String lessonTitle;

    private Float progressPercent;

    private Integer learningTime;

    private Boolean completed;

    private LocalDateTime lastAccessed;
}