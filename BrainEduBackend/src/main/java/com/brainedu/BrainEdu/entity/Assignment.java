package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Table(name = "assignments")
@SQLDelete(sql = """
    UPDATE assignments
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
public class Assignment {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;

    private String title;

    @Column(
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "max_score")
    private Float maxScore;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}