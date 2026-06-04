package com.brainedu.BrainEdu.entity;

import com.brainedu.BrainEdu.common.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "assignment_submissions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentSubmission extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Assignment assignment;

    @ManyToOne
    private User student;

    @Column(columnDefinition = "TEXT")
    private String answerText;

    private String attachmentUrl;

    private Float score;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private LocalDateTime submittedAt;

    private LocalDateTime gradedAt;

    @ManyToOne
    private User gradedBy;

    @Enumerated(EnumType.STRING)
    private SubmissionStatus status;
}