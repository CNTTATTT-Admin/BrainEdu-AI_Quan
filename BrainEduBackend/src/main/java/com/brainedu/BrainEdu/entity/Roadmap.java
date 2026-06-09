package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "roadmaps")
@SQLDelete(sql = """
    UPDATE roadmaps
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
public class Roadmap extends BaseEntity {

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

    @OneToMany(
            mappedBy = "roadmap",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @BatchSize(size = 20)
    @OrderBy("orderIndex ASC")
    private List<RoadmapCourse> roadmapCourses;

}