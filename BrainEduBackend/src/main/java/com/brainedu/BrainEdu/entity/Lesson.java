package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "lessons")
@SQLDelete(sql = """
    UPDATE lessons
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
public class Lesson {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String title;

    @Column(
            columnDefinition = "LONGTEXT"
    )
    private String content;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "lesson_order")
    private Integer lessonOrder;

    @Column(name = "estimated_time")
    private Integer estimatedTime;

    private String difficulty;
}