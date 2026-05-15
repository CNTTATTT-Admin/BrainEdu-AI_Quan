package com.brainedu.BrainEdu.dto.request.AnswerRequest;

import lombok.Data;

@Data
public class AnswerRequest {

    private Long questionId;

    private String answerText;

    private Boolean isCorrect;
}