package com.brainedu.BrainEdu.dto.response.QuizSubmissionResponse;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class QuizSubmissionResponse {

    private Long id;

    private Long quizId;

    private String quizTitle;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Double score;

    private Integer answeredQuestions;

    private Integer skippedQuestions;

    private Boolean passed;

    private Long durationSeconds;

    private LocalDateTime submittedAt;
}
