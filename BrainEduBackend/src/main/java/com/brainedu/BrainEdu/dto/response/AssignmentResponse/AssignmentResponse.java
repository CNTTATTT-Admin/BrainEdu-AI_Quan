package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import com.brainedu.BrainEdu.common.enums.AssignmentStatus;
import com.brainedu.BrainEdu.common.enums.AssignmentTarget;
import com.brainedu.BrainEdu.common.enums.AssignmentType;
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

    private Integer totalRecipients;
}