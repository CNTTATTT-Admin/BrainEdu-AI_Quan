package com.brainedu.BrainEdu.dto.response.QuestionResponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionResponse {

    private Long id;

    private Long quizId;

    private String quizTitle;

    private Long skillId;

    private String skillName;

    private String questionText;

    private String difficultyLevel;

    private String questionType;

    private Float weightScore;
}