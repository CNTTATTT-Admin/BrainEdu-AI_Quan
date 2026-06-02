package com.brainedu.BrainEdu.entity;

import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.brainedu.BrainEdu.common.enums.UserStatus;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@SQLDelete(sql = """
    UPDATE users
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
public class User extends BaseEntity implements UserDetails  {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            name = "name",
            nullable = false
    )
    private String name;

    @Column(
            unique = true,
            nullable = false
    )
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(
            columnDefinition = "TEXT"
    )
    private String avatar;

    @Column(
            name = "learning_goal",
            columnDefinition = "TEXT"
    )
    private String learningGoal;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private UserStatus status = UserStatus.ACTIVE;

    @Column(name = "current_level")
    private String currentLevel;

    @ManyToOne
    @JoinColumn(name = "preferred_category_id")
    private Category preferredCategory;

    private String role;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private String careerGoal;

    private String preferredLevel;

    private String interests;

    // =========================
    // SPRING SECURITY
    // =========================

    @Override
    public Collection<? extends GrantedAuthority>
    getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority(
                        "ROLE_" + role
                )
        );
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}