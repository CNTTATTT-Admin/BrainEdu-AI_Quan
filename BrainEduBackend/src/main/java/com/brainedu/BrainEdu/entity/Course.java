package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brainedu.BrainEdu.common.enums.CourseStatus;
import com.brainedu.BrainEdu.common.enums.CourseType;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@SQLDelete(sql = """
    UPDATE courses
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
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description")
    private String shortDescription;

    private String level;

    @Column(name = "estimated_duration")
    private Integer estimatedDuration;

    @Column(columnDefinition = "TEXT")
    private String thumbnail;

    @Column(name = "difficulty_score")
    private Float difficultyScore;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @Enumerated(EnumType.STRING)
    @Column(name = "course_type")
    private CourseType courseType;

    @Enumerated(EnumType.STRING)
    private CourseStatus status;

    private Float price;

    @Column(name = "max_students")
    private Integer maxStudents;

    @Column(name = "enrollment_start")
    private LocalDateTime enrollmentStart;

    @Column(name = "enrollment_end")
    private LocalDateTime enrollmentEnd;

    @Column(name = "tags", columnDefinition = "TEXT")
    private String tags;

    @Column(name = "career_paths", columnDefinition = "TEXT")
    private String careerPaths;

    @Column(name = "domain_keywords", columnDefinition = "TEXT")
    private String domainKeywords;

    @Column(name = "learning_outcomes", columnDefinition = "TEXT")
    private String learningOutcomes;

    @Column(name = "industries", columnDefinition = "TEXT")
    private String industries;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "total_enrolled")
    @Builder.Default
    private Long totalEnrolled = 0L;

    @Column(name = "total_lessons")
    @Builder.Default
    private Long totalLessons = 0L;

    @Column(name = "average_rating")
    @Builder.Default
    private Double averageRating = 0.0;

    @Column(name = "total_ratings")
    @Builder.Default
    private Long totalRatings = 0L;

    public boolean isFree() {
    return price == null || price == 0;
}
}