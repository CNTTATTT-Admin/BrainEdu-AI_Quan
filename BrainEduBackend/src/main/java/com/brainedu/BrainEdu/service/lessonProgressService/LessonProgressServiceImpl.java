package com.brainedu.BrainEdu.service.lessonProgressService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.LessonProgressRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.*;
import com.brainedu.BrainEdu.entity.Lesson;
import com.brainedu.BrainEdu.entity.LessonProgress;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.LessonProgressMapper;
import com.brainedu.BrainEdu.repository.LessonProgressRepository;
import com.brainedu.BrainEdu.repository.LessonRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.lessonProgressService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonProgressServiceImpl
        implements LessonProgressService {

    private final LessonProgressRepository
            lessonProgressRepository;

    private final LessonRepository
            lessonRepository;

    private final UserRepository
            userRepository;

    private final LessonProgressMapper
            lessonProgressMapper;

    @Override
    public LessonProgressResponse saveProgress(
            LessonProgressRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        Lesson lesson =
                lessonRepository.findById(
                                request.getLessonId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Lesson not found"
                                )
                        );

        LessonProgress progress =
                lessonProgressRepository
                        .findByUserIdAndLessonId(
                                user.getId(),
                                lesson.getId()
                        )
                        .orElse(
                                LessonProgress.builder()
                                        .user(user)
                                        .lesson(lesson)
                                        .build()
                        );

        progress.setProgressPercent(
                request.getProgressPercent()
        );

        progress.setLearningTime(
                request.getLearningTime()
        );

        progress.setCompleted(
                request.getCompleted()
        );

        progress.setLastAccessed(
                LocalDateTime.now()
        );

        lessonProgressRepository.save(
                progress
        );

        return lessonProgressMapper
                .toResponse(progress);
    }

    @Override
    public List<LessonProgressResponse>
    myProgress() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        return lessonProgressRepository
                .findByUserId(user.getId())
                .stream()
                .map(
                        lessonProgressMapper
                                ::toResponse
                )
                .toList();
    }

    @Override
    public LessonProgressResponse getByLesson(
            Long lessonId
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        LessonProgress progress =
                lessonProgressRepository
                        .findByUserIdAndLessonId(
                                user.getId(),
                                lessonId
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Progress not found"
                                )
                        );

        return lessonProgressMapper
                .toResponse(progress);
    }
}