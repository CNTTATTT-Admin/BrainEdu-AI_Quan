package com.brainedu.BrainEdu.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "student_group_members")
@Getter
@Setter
public class StudentGroupMember {

    @Id
    private Long id;

    @ManyToOne
    private StudentGroup group;

    @ManyToOne
    private User student;
}