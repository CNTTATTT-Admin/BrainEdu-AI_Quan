package com.brainedu.BrainEdu.dto.response.AnswerResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerResponse {

    private Long id;

    private Long questionId;

    private String questionText;

    private String answerText;

    private Boolean isCorrect;
}