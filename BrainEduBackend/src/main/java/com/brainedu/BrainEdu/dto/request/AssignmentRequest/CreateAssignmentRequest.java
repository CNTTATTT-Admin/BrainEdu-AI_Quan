package com.brainedu.BrainEdu.dto.request.AssignmentRequest;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAssignmentRequest {

    private Long courseId;

    private String title;

    private String description;

    private LocalDateTime dueDate;

    private Float maxScore;
}