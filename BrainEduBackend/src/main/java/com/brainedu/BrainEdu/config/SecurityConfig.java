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
                                "ADMIN"
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
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/courses/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/courses/**"
                        ).hasRole("ADMIN")

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
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/course-skills/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/course-skills/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/quizzes/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/quizzes/**"
                        ).hasRole("ADMIN")

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