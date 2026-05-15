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

    @Column(name = "course_order")
    private Integer courseOrder;

    @Column(name = "is_required")
    private Boolean isRequired;
}