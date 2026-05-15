package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roadmaps")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Roadmap {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "roadmap_name")
    private String roadmapName;

    private String level;

    @Column(
            columnDefinition = "TEXT"
    )
    private String description;
}