package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String title;

    @Column(
            columnDefinition = "TEXT"
    )
    private String description;

    private String level;

    @Column(name = "estimated_duration")
    private Integer estimatedDuration;

    @Column(
            columnDefinition = "TEXT"
    )
    private String thumbnail;

    @Column(name = "difficulty_score")
    private Float difficultyScore;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}