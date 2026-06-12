package com.brainedu.BrainEdu.service.quizService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.QuizRequest.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.*;
import com.brainedu.BrainEdu.entity.Lesson;
import com.brainedu.BrainEdu.entity.Question;
import com.brainedu.BrainEdu.entity.Quiz;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.QuizMapper;
import com.brainedu.BrainEdu.repository.LessonRepository;
import com.brainedu.BrainEdu.repository.QuestionRepository;
import com.brainedu.BrainEdu.repository.QuizRepository;
import com.brainedu.BrainEdu.repository.QuizSubmissionRepository;
import com.brainedu.BrainEdu.service.quizService.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;

import lombok.RequiredArgsConstructor;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final QuestionRepository
            questionRepository;

    private final QuizMapper
            quizMapper;
    private final CurrentUserService currentUserService;
    private final QuizSubmissionRepository quizSubmissionRepository;

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
                                request.getPassingScore().floatValue()
                        )

                        .build();

        quizRepository.save(quiz);

        return quizMapper.toResponse(
                quiz
        );
    }

    @Override
    public Page<QuizResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return quizRepository.findAll(pageable)
                .map(
                        quizMapper::toResponse
                );
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
        public Page<QuizResponse> getByLesson(
                Long lessonId,
                int page,
                int size
        ) {
        Pageable pageable = PageRequest.of(page, size);
        User user = currentUserService.getCurrentUser();

        return quizRepository
                .findByLessonId(
                        lessonId,
                        pageable
                )
                .map(quiz -> {
                        QuizResponse response = quizMapper.toResponse(quiz);
                        boolean hasSubmitted = quizSubmissionRepository.existsByUserIdAndQuizId(user.getId(), quiz.getId());
                        response.setIsSubmitted(hasSubmitted);
                        return response;
                });
        }

    @Cacheable(value = "quiz_questions", key = "#quizId")
        @Override
        public List<QuizQuestionAnswerResponse> getQuizQuestions(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ApiException("Quiz not found"));

        List<Question> questions = questionRepository.findAllWithAnswersByQuizId(quiz.getId());

        return questions.stream().map(question -> 
                QuizQuestionAnswerResponse.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .answers(question.getAnswers().stream().map(answer -> 
                        QuizQuestionAnswerResponse.AnswerItem.builder()
                        .id(answer.getId())
                        .answerText(answer.getAnswerText())
                        .isCorrect(answer.getIsCorrect())
                        .build()
                ).toList())
                .build()
        ).toList();
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
                request.getPassingScore().floatValue()
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