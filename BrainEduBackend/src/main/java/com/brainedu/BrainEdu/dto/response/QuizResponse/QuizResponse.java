package com.brainedu.BrainEdu.dto.response.QuizResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizResponse {

    private Long id;

    private Long lessonId;

    private String lessonTitle;

    private String title;

    private String quizType;

    private Integer totalQuestions;

    private Integer duration;

    private Float passingScore;
}