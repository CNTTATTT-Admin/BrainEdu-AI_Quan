package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import com.brainedu.BrainEdu.common.enums.AssignmentStatus;
import com.brainedu.BrainEdu.common.enums.AssignmentTarget;
import com.brainedu.BrainEdu.common.enums.AssignmentType;
import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class AssignmentResponse {

    private Long id;

    private String title;

    private String description;

    private AssignmentType type;

    private AssignmentTarget target;

    private Long courseId;

    private String courseName;

    private Long quizId;

    private String quizTitle;

    private Float maxScore;

    private LocalDateTime startAt;

    private LocalDateTime dueDate;

    private AssignmentStatus status;

    private SubmissionStatus submissionStatus;

    private Integer totalRecipients;

    private Float score;

    private String feedback;

    private Integer submissionCount;
}