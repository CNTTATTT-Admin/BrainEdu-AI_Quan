package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_learning_paths")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLearningPath {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "roadmap_id")
    private Roadmap roadmap;

    @Column(name = "recommendation_score")
    private Float recommendationScore;

    private String status;

    @Column(
            name = "recommended_reason",
            columnDefinition = "TEXT"
    )
    private String recommendedReason;

    @Column(name = "ai_generated")
    private Boolean aiGenerated;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}