package com.brainedu.BrainEdu.dto.response.AssignmentResponse;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PendingAssignmentResponse {
    private Long submissionId;
    private Long assignmentId;
    private String studentName;
    private Long studentId;
    private String studentEmail;
    private String courseTitle;
    private String assignmentTitle;
    private LocalDateTime submittedAt;
    private String status;
    private String answerText;     
    private String attachmentUrl;
}