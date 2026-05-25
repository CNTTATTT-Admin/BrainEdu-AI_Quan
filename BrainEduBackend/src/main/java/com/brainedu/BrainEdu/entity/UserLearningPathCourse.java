package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_learning_path_courses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLearningPathCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserLearningPath learningPath;

    @ManyToOne
    private Course course;

    private Integer orderIndex;

    private String status;

    private Float progressPercent;

    private Boolean completed;
}