package com.brainedu.BrainEdu.dto.request.AIRecommendationRequest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIRecommendationRequest {

    @JsonProperty("career_goal")
    private String careerGoal;

    private List<String> interests;

    private Map<String, Integer> skills;

    @JsonProperty("experience_level")
    private String experienceLevel;

    @JsonProperty("learning_goal_type")
    private String learningGoalType;

    @JsonProperty("preferred_learning_style")
    private String preferredLearningStyle;

    @JsonProperty("available_hours_per_week")
    private Integer availableHoursPerWeek;

    @JsonProperty("target_timeline_months")
    private Integer targetTimelineMonths;

    @JsonProperty("preferred_content_type")
    private List<String> preferredContentType;

    @JsonProperty("completed_courses")
    private List<String> completedCourses;
}
