package com.brainedu.BrainEdu.dto.response.UserResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TopStudentResponse {
    private Long studentId;
    private String studentName;
    private String studentAvatar;
    private Double averageCompletionPercent;
    private Double averageAssignmentScore;
    private Double averageQuizScore;
    private Long completedCourses;
    private Long totalLearningTime;    
    private Long completedLessons;
    private Long enrolledCourses;
    private Long totalQuizzesTaken;
    private Double overallPerformanceScore;
}