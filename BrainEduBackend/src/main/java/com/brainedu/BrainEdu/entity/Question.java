package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(
            name = "question_text",
            columnDefinition = "TEXT"
    )
    private String questionText;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "weight_score")
    private Float weightScore;
}