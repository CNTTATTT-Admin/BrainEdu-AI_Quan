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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // 1. GOM TOÀN BỘ CÁC URL KHÔNG CẦN CHECK QUYỀN (PUBLIC) LÊN ĐẦU
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/assignments/**").permitAll()
                        .requestMatchers("/api/v1/assignment-recipients/**").permitAll()
                        .requestMatchers("/api/v1/submissions/**").permitAll()
                        .requestMatchers("/api/v1/quiz-analyses/**").permitAll()
                        .requestMatchers("/api/v1/notifications/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/behavior/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/fields/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/lessons/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/courses/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/skills/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/course-skills/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/quizzes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/questions/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/answers/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/roadmaps/**").permitAll()
                        .requestMatchers("/api/v1/users/**").permitAll()
                        .requestMatchers("/api/v1/courses/**").permitAll()
                        .requestMatchers("/api/v1/payments/**").permitAll()

                        // 2. PHÂN QUYỀN CHO CÁC API CÒN LẠI (YÊU CẦU ĐĂNG NHẬP/ROLE)
                        .requestMatchers("/api/v1/admin/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/api/v1/users/me").hasAnyRole("USER", "ADMIN", "INSTRUCTOR")
                        
                        .requestMatchers("/api/v1/fields/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/roadmaps/**").hasRole("ADMIN")
                        
                        .requestMatchers("/api/v1/lessons/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/api/v1/skills/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/api/v1/course-skills/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/api/v1/quizzes/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/api/v1/questions/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        .requestMatchers("/api/v1/answers/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                        
                        .requestMatchers("/api/v1/enrollments/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/v1/lesson-progress/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/v1/quiz-submissions/submit").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/quiz-submissions/**").hasAnyRole("ADMIN", "INSTRUCTOR", "USER")
                        
                        .requestMatchers("/api/v1/user-answers/**").authenticated()
                        .requestMatchers("/api/v1/user-learning-paths/**").authenticated()
                        .requestMatchers("/api/v1/ai-recommendations/**").authenticated()
                        
                        .requestMatchers("/api/v1/instructor/**").hasAnyRole("INSTRUCTOR", "ADMIN")
                        .requestMatchers("/api/v1/student/**").hasAnyRole("USER", "ADMIN", "INSTRUCTOR")
                        
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}