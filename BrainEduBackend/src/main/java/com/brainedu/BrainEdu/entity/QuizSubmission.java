package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quiz_submissions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Quiz quiz;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Double score;

    private Boolean passed;

    private Long durationSeconds;

    private LocalDateTime submittedAt;

    @OneToMany(
            mappedBy = "quizSubmission",
            cascade = CascadeType.ALL
    )
    private List<UserAnswer> answers;
}
