package com.brainedu.BrainEdu.entity;

import com.brainedu.BrainEdu.common.enums.AssignmentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brainedu.BrainEdu.common.enums.AssignmentTarget;
import com.brainedu.BrainEdu.common.enums.AssignmentType;

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
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Assignment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Course course;

    @ManyToOne
    private User instructor;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private AssignmentType type;

    @Enumerated(EnumType.STRING)
    private AssignmentTarget target;

    @ManyToOne
    private Quiz quiz;

    private String attachmentUrl;

    private Float maxScore;

    private LocalDateTime startAt;

    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    private AssignmentStatus status;
}