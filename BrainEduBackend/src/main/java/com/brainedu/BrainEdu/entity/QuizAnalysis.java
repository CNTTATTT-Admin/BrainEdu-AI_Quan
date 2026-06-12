package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import com.brainedu.BrainEdu.common.enums.AnalysisStatus;
import com.brainedu.BrainEdu.constant.ReliabilityLevel;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "quiz_analyses",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = "quiz_submission_id"
        )
    }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizAnalysis {

    @Id
    @GeneratedValue(
        strategy = GenerationType.IDENTITY
    )
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "quiz_submission_id",
        nullable = false
    )
    private QuizSubmission quizSubmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        nullable = false
    )
    private User user;

    @Enumerated(EnumType.STRING)
    private AnalysisStatus status;

    @Enumerated(EnumType.STRING)
    private ReliabilityLevel reliability;

    @Column(
        name = "analysis_json",
        columnDefinition = "LONGTEXT"
    )
    private String analysisJson;

    @Column(
        name = "model_name"
    )
    private String modelName;

    @Column(
        name = "generated_at"
    )
    private LocalDateTime generatedAt;

    @Column(
        name = "updated_at"
    )
    private LocalDateTime updatedAt;
}