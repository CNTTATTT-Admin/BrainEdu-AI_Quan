package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_recommendations")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIRecommendation {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "recommendation_type")
    private String recommendationType;

    @Column(name = "target_id")
    private Long targetId;

    private Float score;

    @Column(
            columnDefinition = "TEXT"
    )
    private String reason;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}