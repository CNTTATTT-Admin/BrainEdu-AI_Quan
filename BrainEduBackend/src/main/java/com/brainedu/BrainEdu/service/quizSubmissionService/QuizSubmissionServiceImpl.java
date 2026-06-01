package com.brainedu.BrainEdu.service.quizSubmissionService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java.QuizAnswerRequest;
import com.brainedu.BrainEdu.dto.response.QuizResponse.QuizReviewResponse;
import com.brainedu.BrainEdu.dto.response.QuizSubmissionResponse.*;
import com.brainedu.BrainEdu.entity.*;
import com.brainedu.BrainEdu.mapper.QuizSubmissionMapper;
import com.brainedu.BrainEdu.repository.*;
import com.brainedu.BrainEdu.ultils.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java.SubmitQuizRequest;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuizSubmissionServiceImpl
        implements QuizSubmissionService {

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

        int totalQuestions = questionRepository.countByQuizId(quiz.getId());
        int answeredQuestions = request.getAnswers().size();
        int skippedQuestions = totalQuestions - answeredQuestions;

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

        submission.setAnsweredQuestions(
                answeredQuestions
        );

        submission.setSkippedQuestions(
                skippedQuestions
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
    @Transactional(readOnly = true)
    public QuizReviewResponse getReview(
            Long submissionId
    ) {

        User currentUser =
                currentUserService
                        .getCurrentUser();

        QuizSubmission submission =
                quizSubmissionRepository
                        .findReviewByIdAndUserId(
                                submissionId,
                                currentUser.getId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz review not found"
                                )
                        );

        Quiz quiz =
                submission.getQuiz();

        Map<Long, UserAnswer> userAnswerMap =
                submission.getAnswers()
                        .stream()
                        .collect(
                                Collectors.toMap(
                                        ua -> ua.getQuestion()
                                                .getId(),
                                        ua -> ua
                                )
                        );

        List<QuizReviewResponse.QuestionReviewItem>
                questionItems =
                quiz.getQuestions()
                        .stream()
                        .map(question -> {

                            UserAnswer userAnswer =
                                    userAnswerMap.get(
                                            question.getId()
                                    );

                            Answer selectedAnswer =
                                    userAnswer != null
                                            ? userAnswer.getSelectedAnswer()
                                            : null;

                            Long correctAnswerId =
                                    question.getAnswers()
                                            .stream()
                                            .filter(
                                                    Answer::getIsCorrect
                                            )
                                            .findFirst()
                                            .map(
                                                    Answer::getId
                                            )
                                            .orElse(null);

                            List<QuizReviewResponse.AnswerItem>
                                    answerItems =
                                    question.getAnswers()
                                            .stream()
                                            .map(answer ->

                                                    QuizReviewResponse
                                                            .AnswerItem
                                                            .builder()

                                                            .id(
                                                                    answer.getId()
                                                            )

                                                            .answerText(
                                                                    answer.getAnswerText()
                                                            )

                                                            .correct(
                                                                    answer.getIsCorrect()
                                                            )

                                                            .selected(
                                                                    selectedAnswer != null
                                                                            && answer.getId()
                                                                            .equals(
                                                                                    selectedAnswer.getId()
                                                                            )
                                                            )

                                                            .build()
                                            )
                                            .toList();

                            return QuizReviewResponse
                                    .QuestionReviewItem
                                    .builder()

                                    .questionId(
                                            question.getId()
                                    )

                                    .questionNumber(
                                            question.getQuestionOrder()
                                    )

                                    .questionText(
                                            question.getQuestionText()
                                    )

                                    .questionType(
                                            question.getQuestionType()
                                    )

                                    .difficultyLevel(
                                            question.getDifficultyLevel()
                                    )

                                    .selectedAnswerId(
                                            selectedAnswer != null
                                                    ? selectedAnswer.getId()
                                                    : null
                                    )

                                    .correctAnswerId(
                                            correctAnswerId
                                    )

                                    .isCorrect(
                                            userAnswer != null
                                                    ? userAnswer.getIsCorrect()
                                                    : false
                                    )

                                    .answers(
                                            answerItems
                                    )

                                    .build();
                        })
                        .toList();

        return QuizReviewResponse
                .builder()

                .submissionId(
                        submission.getId()
                )

                .quizId(
                        quiz.getId()
                )

                .quizTitle(
                        quiz.getTitle()
                )

                .score(
                        submission.getScore()
                )

                .passed(
                        submission.getPassed()
                )

                .totalQuestions(
                        submission.getTotalQuestions()
                )

                .correctAnswers(
                        submission.getCorrectAnswers()
                )

                .answeredQuestions(
                        submission.getAnsweredQuestions()
                )

                .skippedQuestions(
                        submission.getSkippedQuestions()
                )

                .submittedAt(
                        submission.getSubmittedAt()
                )

                .questions(
                        questionItems
                )

                .build();
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
