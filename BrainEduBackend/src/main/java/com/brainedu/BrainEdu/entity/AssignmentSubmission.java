package com.brainedu.BrainEdu.entity;

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
public class AssignmentSubmission {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @Column(
            name = "text_answer",
            columnDefinition = "LONGTEXT"
    )
    private String textAnswer;

    @Column(name = "file_url")
    private String fileUrl;

    private Float score;

    @Column(
            columnDefinition = "TEXT"
    )
    private String feedback;

    @ManyToOne
    @JoinColumn(name = "graded_by")
    private User gradedBy;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "graded_at")
    private LocalDateTime gradedAt;

    private String status;
}