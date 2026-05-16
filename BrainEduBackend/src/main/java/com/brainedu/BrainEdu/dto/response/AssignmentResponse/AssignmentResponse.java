package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentResponse {

    private Long id;

    private Long courseId;

    private String courseTitle;

    private Long instructorId;

    private String instructorName;

    private String title;

    private String description;

    private LocalDateTime dueDate;

    private Float maxScore;

    private LocalDateTime createdAt;
}