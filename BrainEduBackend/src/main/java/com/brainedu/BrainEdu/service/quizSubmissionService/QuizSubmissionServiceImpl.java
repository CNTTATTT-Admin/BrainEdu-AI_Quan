package com.brainedu.BrainEdu.service.quizSubmissionService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.QuizRequest.SubmitQuizRequest;
import com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java.QuizAnswerRequest;
import com.brainedu.BrainEdu.dto.response.QuizSubmissionResponse.*;
import com.brainedu.BrainEdu.entity.*;
import com.brainedu.BrainEdu.mapper.QuizSubmissionMapper;
import com.brainedu.BrainEdu.repository.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizSubmissionServiceImpl
        implements QuizSubmissionService {

    private final UserRepository userRepository;

    private final QuizRepository quizRepository;

    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;

    private final UserAnswerRepository userAnswerRepository;

    private final QuizSubmissionRepository
            quizSubmissionRepository;

    private final QuizSubmissionMapper
            quizSubmissionMapper;

    private final CurrentUserService
            currentUserService;

    @Override
    public QuizSubmissionResponse submitQuiz(
             SubmitQuizRequest request
    ) {

        User user =
                currentUserService.getCurrentUser();

        Quiz quiz =
                quizRepository.findById(
                                request.getQuizId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz not found"
                                )
                        );

        int correctCount = 0;

        List<UserAnswer> userAnswers =
                new ArrayList<>();

        QuizSubmission submission =
                QuizSubmission.builder()

                        .user(user)

                        .quiz(quiz)

                        .submittedAt(
                                LocalDateTime.now()
                        )

                        .durationSeconds(
                                request.getDurationSeconds()
                        )

                        .build();

        for (
                QuizAnswerRequest answerRequest
                : request.getAnswers()
        ) {

            Question question =
                    questionRepository
                            .findByIdAndQuizId(
                                    answerRequest.getQuestionId(),
                                    request.getQuizId()
                            )
                            .orElseThrow(
                                    () -> new ApiException(
                                            "Question does not belong to quiz"
                                    )
                            );


            Answer selectedAnswer =
                    answerRepository
                            .findByIdAndQuestionId(
                                    answerRequest.getAnswerId(),
                                    answerRequest.getQuestionId()
                            )
                            .orElseThrow(
                                    () -> new ApiException(
                                            "Invalid answer for question"
                                    )
                            );


            boolean isCorrect =
                    selectedAnswer.getIsCorrect();

            if (isCorrect) {
                correctCount++;
            }

            UserAnswer userAnswer =
                    UserAnswer.builder()

                            .user(user)

                            .question(question)

                            .selectedAnswer(
                                    selectedAnswer
                            )

                            .quizSubmission(
                                    submission
                            )

                            .isCorrect(
                                    isCorrect
                            )

                            .submittedAt(
                                    LocalDateTime.now()
                            )

                            .build();

            userAnswers.add(userAnswer);
        }

        int totalQuestions = quiz.getTotalQuestions();

        double score =
                ((double) correctCount
                        / totalQuestions) * 100;

        boolean passed =
                score >= quiz.getPassingScore();

        submission.setAnswers(
                userAnswers
        );

        submission.setTotalQuestions(
                totalQuestions
        );

        submission.setCorrectAnswers(
                correctCount
        );

        submission.setScore(score);

        submission.setPassed(
                passed
        );

        QuizSubmission savedSubmission =
                quizSubmissionRepository.save(
                        submission
                );

        userAnswerRepository.saveAll(
                userAnswers
        );

        return quizSubmissionMapper
                .toResponse(
                        savedSubmission
                );
    }

    @Override
    public Page<QuizSubmissionResponse>
    getMyResults(
            int page,
            int size
    ) {

        User user =
                currentUserService.getCurrentUser();

        Pageable pageable =
                PageRequest.of(page, size);

        return quizSubmissionRepository
                .findByUserId(
                        user.getId(),
                        pageable
                )
                .map(
                        quizSubmissionMapper
                                ::toResponse
                );
    }

    @Override
    public QuizSubmissionResponse getResult(
            Long submissionId
    ) {

        User currentUser =
                currentUserService
                        .getCurrentUser();

        QuizSubmission submission =
                quizSubmissionRepository
                        .findByIdAndUserId(
                                submissionId,
                                currentUser.getId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz submission not found"
                                )
                        );

        return quizSubmissionMapper
                .toResponse(submission);
    }
}
