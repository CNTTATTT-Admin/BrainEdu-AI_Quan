package com.brainedu.BrainEdu.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skill_proficiency")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillProficiency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Skill skill;

    private Float proficiencyScore;

    private Integer totalAttempts;

    private Integer correctAnswers;

    private LocalDateTime updatedAt;
}
