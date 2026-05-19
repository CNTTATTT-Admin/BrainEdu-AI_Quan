package com.brainedu.BrainEdu.config;

import com.brainedu.BrainEdu.middleware.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/v1/auth/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/users/me"
                        ).hasAnyRole(
                                "USER",
                                "ADMIN",
                                "INSTRUCTOR"
                        )

                        .requestMatchers(
                                "/api/v1/users/**"
                        ).hasRole("ADMIN")

                        // PUBLIC GET
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/fields/**"
                        ).permitAll()

                        // ADMIN POST PUT DELETE
                        .requestMatchers(
                                "/api/v1/fields/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/lessons/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/lessons/**"
                        ).hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/courses/**"
                        ).permitAll()

                        .requestMatchers("/api/v1/courses/**")
                        .hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                "/api/v1/enrollments/**"
                        ).hasAnyRole(
                                "USER",
                                "ADMIN"
                        )

                        .requestMatchers(
                                "/api/v1/lesson-progress/**"
                        ).hasAnyRole(
                                "USER",
                                "ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/skills/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/skills/**"
                        ).hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/course-skills/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/course-skills/**"
                        ).hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/quizzes/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/quizzes/**"
                        ).hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/questions/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/questions/**"
                        ).hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/answers/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/answers/**"
                        ).hasAnyRole("ADMIN", "INSTRUCTOR")

                        .requestMatchers(
                                "/api/v1/user-answers/**"
                        ).authenticated()

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/roadmaps/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/roadmaps/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                "/api/v1/user-learning-paths/**"
                        ).authenticated()

                        .requestMatchers(
                                "/api/v1/ai-recommendations/**"
                        ).authenticated()

                        .requestMatchers(
                                "/api/v1/instructor/**"
                        )
                        .hasRole("INSTRUCTOR")
                        .requestMatchers(
                                "/api/v1/student/**"
                        )
                        .hasAnyRole(
                                "USER",
                                "ADMIN",
                                "INSTRUCTOR"
                        )
                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}