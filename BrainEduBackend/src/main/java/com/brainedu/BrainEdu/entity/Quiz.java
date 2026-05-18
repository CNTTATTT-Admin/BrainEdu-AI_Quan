package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "quizzes")
@SQLDelete(sql = """
    UPDATE quizzes
    SET deleted = true,
        deleted_at = NOW()
    WHERE id = ?
""")

@Where(clause = "deleted = false")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Quiz extends BaseEntity{

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    private String title;

    @Column(name = "quiz_type")
    private String quizType;

    @Column(name = "total_questions")
    private Integer totalQuestions;

    private Integer duration;

    @Column(name = "passing_score")
    private Float passingScore;
}