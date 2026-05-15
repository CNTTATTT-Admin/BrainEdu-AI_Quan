package com.brainedu.BrainEdu.service.quizService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.QuizRequest.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.*;
import com.brainedu.BrainEdu.entity.Lesson;
import com.brainedu.BrainEdu.entity.Quiz;
import com.brainedu.BrainEdu.mapper.QuizMapper;
import com.brainedu.BrainEdu.repository.LessonRepository;
import com.brainedu.BrainEdu.repository.QuizRepository;
import com.brainedu.BrainEdu.service.quizService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl
        implements QuizService {

    private final QuizRepository
            quizRepository;

    private final LessonRepository
            lessonRepository;

    private final QuizMapper
            quizMapper;

    @Override
    public QuizResponse create(
            QuizRequest request
    ) {

        Lesson lesson =
                lessonRepository.findById(
                                request.getLessonId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Lesson not found"
                                )
                        );

        Quiz quiz =
                Quiz.builder()

                        .lesson(lesson)

                        .title(
                                request.getTitle()
                        )

                        .quizType(
                                request.getQuizType()
                        )

                        .totalQuestions(
                                request.getTotalQuestions()
                        )

                        .duration(
                                request.getDuration()
                        )

                        .passingScore(
                                request.getPassingScore()
                        )

                        .build();

        quizRepository.save(quiz);

        return quizMapper.toResponse(
                quiz
        );
    }

    @Override
    public List<QuizResponse> getAll() {

        return quizRepository.findAll()
                .stream()
                .map(
                        quizMapper::toResponse
                )
                .toList();
    }

    @Override
    public QuizResponse getById(
            Long id
    ) {

        Quiz quiz =
                quizRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz not found"
                                )
                        );

        return quizMapper.toResponse(
                quiz
        );
    }

    @Override
    public List<QuizResponse> getByLesson(
            Long lessonId
    ) {

        return quizRepository
                .findByLessonId(
                        lessonId
                )
                .stream()
                .map(
                        quizMapper::toResponse
                )
                .toList();
    }

    @Override
    public QuizResponse update(
            Long id,
            QuizRequest request
    ) {

        Quiz quiz =
                quizRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz not found"
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

        quiz.setLesson(lesson);

        quiz.setTitle(
                request.getTitle()
        );

        quiz.setQuizType(
                request.getQuizType()
        );

        quiz.setTotalQuestions(
                request.getTotalQuestions()
        );

        quiz.setDuration(
                request.getDuration()
        );

        quiz.setPassingScore(
                request.getPassingScore()
        );

        quizRepository.save(quiz);

        return quizMapper.toResponse(
                quiz
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        Quiz quiz =
                quizRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz not found"
                                )
                        );

        quizRepository.delete(quiz);

        return "Quiz deleted successfully";
    }
}