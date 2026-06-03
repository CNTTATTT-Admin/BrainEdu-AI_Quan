package com.brainedu.BrainEdu.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.*;
@Entity
@Table(name = "student_groups")
public class StudentGroup {

    @Id
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    private Course course;
}