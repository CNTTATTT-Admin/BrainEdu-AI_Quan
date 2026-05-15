package com.brainedu.BrainEdu.dto.request.QuizRequest;

import lombok.Data;

@Data
public class QuizRequest {

    private Long lessonId;

    private String title;

    private String quizType;

    private Integer totalQuestions;

    private Integer duration;

    private Float passingScore;
}