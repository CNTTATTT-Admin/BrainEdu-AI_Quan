package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class SubmissionResponse {

    private Long id;

    private Long assignmentId;

    private String assignmentTitle;

    private Long studentId;

    private String studentName;

    private String answerText;

    private String attachmentUrl;

    private Float score;

    private String feedback;

    private SubmissionStatus status;

    private LocalDateTime submittedAt;

    private LocalDateTime gradedAt;
}