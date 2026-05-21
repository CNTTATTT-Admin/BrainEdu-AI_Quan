package com.brainedu.BrainEdu.dto.response.QuizResponse;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionAnswerResponse {

    private Long id;

    private String questionText;

    private String difficultyLevel;

    private String questionType;

    private List<AnswerItem> answers;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnswerItem {

        private Long id;

        private String answerText;

        private Boolean isCorrect;
    }
}
