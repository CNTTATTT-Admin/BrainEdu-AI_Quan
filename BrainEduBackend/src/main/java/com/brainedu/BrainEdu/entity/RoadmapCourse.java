package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roadmap_courses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapCourse {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "roadmap_id")
    private Roadmap roadmap;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "order_index")
    private Integer orderIndex;

    @Column(name = "required_course")
    private Boolean requiredCourse;

    @Column(name = "estimated_week")
    private Integer estimatedWeek;
}
