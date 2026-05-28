package com.brainedu.BrainEdu.dto.request.UserBehaviorRequest;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAnalysisRequest {

    private Long user_id;

    private String quiz_id;

    private Double score;

    private Integer time_spent_seconds;

    private Integer avg_system_time_seconds;

    private List<SkillPerformanceDTO>
            skills_performance;

    private List<String>
            wrong_questions_tags;

}
