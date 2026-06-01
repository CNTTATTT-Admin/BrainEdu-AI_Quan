package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quiz_submission_answers")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmissionAnswer {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(
        name = "quiz_submission_id",
        nullable = false
)
private QuizSubmission quizSubmission;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(
        name = "question_id",
        nullable = false
)
private Question question;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(
        name = "selected_answer_id"
)
private Answer selectedAnswer;

@Column(nullable = false)
private Boolean isCorrect;

}
