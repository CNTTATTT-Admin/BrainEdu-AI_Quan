package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentSubmissionResponse {

    private Long id;

    private Long assignmentId;

    private String assignmentTitle;

    private Long studentId;

    private String studentName;

    private String textAnswer;

    private String fileUrl;

    private Float score;

    private String feedback;

    private String gradedBy;

    private LocalDateTime submittedAt;

    private LocalDateTime gradedAt;

    private String status;
}