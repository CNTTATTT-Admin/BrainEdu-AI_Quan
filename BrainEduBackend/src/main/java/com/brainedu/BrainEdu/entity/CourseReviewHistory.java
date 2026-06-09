package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "course_review_histories")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseReviewHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết trực tiếp tới bản ghi đánh giá chính
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false)
    private CourseReview courseReview;

    @Column(name = "old_rating", nullable = false)
    private Integer oldRating;

    @Column(name = "old_comment", columnDefinition = "TEXT")
    private String oldComment;

    @Column(name = "edited_at", nullable = false)
    private LocalDateTime editedAt;

    @PrePersist
    protected void onCreate() {
        this.editedAt = LocalDateTime.now();
    }
}