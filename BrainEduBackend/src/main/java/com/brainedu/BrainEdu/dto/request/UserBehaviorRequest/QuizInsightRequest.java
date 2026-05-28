package com.brainedu.BrainEdu.dto.request.UserBehaviorRequest;

import lombok.Data;

@Data
public class QuizInsightRequest {

    private Long user_id;

    private Long quiz_submission_id;

}