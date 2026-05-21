package com.brainedu.BrainEdu.dto.response.QuizResponse;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizReviewResponse {

    private Long submissionId;

    private Long quizId;

    private String quizTitle;

    private Double score;

    private Boolean passed;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Integer answeredQuestions;

    private Integer skippedQuestions;

    private LocalDateTime submittedAt;

    private List<QuestionReviewItem>
            questions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionReviewItem {

        private Long questionId;

        private Integer questionNumber;

        private String questionText;

        private String questionType;

        private Integer questionOrder;

        private String difficultyLevel;

        private Long selectedAnswerId;

        private Long correctAnswerId;

        private Boolean isCorrect;

        private List<AnswerItem>
                answers;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnswerItem {

        private Long id;

        private String answerText;

        private Boolean correct;

        private Boolean selected;
    }
}
