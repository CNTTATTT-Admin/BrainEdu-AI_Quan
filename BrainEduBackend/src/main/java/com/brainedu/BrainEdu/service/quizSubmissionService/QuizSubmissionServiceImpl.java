package com.brainedu.BrainEdu.service.quizSubmissionService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java.*;
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

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
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

    @Transactional
        @Override
        public QuizSubmissionResponse submitQuiz(
                SubmitQuizRequest request
        ) {

        User user = currentUserService.getCurrentUser();

        Quiz quiz = quizRepository.findById(
                        request.getQuizId()
                )
                .orElseThrow(() ->
                        new ApiException("Quiz not found"));

        Optional<QuizSubmission> existingSubmission =
                quizSubmissionRepository
                        .findByUserIdAndQuizId(
                                user.getId(),
                                quiz.getId()
                        );

        if (existingSubmission.isPresent()) {
                return quizSubmissionMapper.toResponse(
                        existingSubmission.get()
                );
        }

        List<Question> questions =
                questionRepository.findByQuizId(
                        quiz.getId()
                );

        Map<Long, Question> questionMap =
                questions.stream()
                        .collect(Collectors.toMap(
                                Question::getId,
                                Function.identity()
                        ));

        List<Answer> answers =
                answerRepository.findByQuestionQuizId(
                        quiz.getId()
                );

        Map<Long, Answer> answerMap =
                answers.stream()
                        .collect(Collectors.toMap(
                                Answer::getId,
                                Function.identity()
                        ));

        QuizSubmission submission =
                QuizSubmission.builder()
                        .user(user)
                        .quiz(quiz)
                        .submittedAt(LocalDateTime.now())
                        .durationSeconds(
                                request.getDurationSeconds()
                        )
                        .build();

        int correctCount = 0;

        List<UserAnswer> userAnswers =
                new ArrayList<>();

        for (QuizAnswerRequest answerRequest : request.getAnswers()) {

                Question question =
                        questionMap.get(
                                answerRequest.getQuestionId()
                        );

                if (question == null) {
                throw new ApiException(
                        "Question does not belong to quiz"
                );
                }

                Answer selectedAnswer =
                        answerMap.get(
                                answerRequest.getAnswerId()
                        );

                if (
                        selectedAnswer == null
                                || !selectedAnswer
                                .getQuestion()
                                .getId()
                                .equals(question.getId())
                ) {
                throw new ApiException(
                        "Invalid answer for question"
                );
                }

                boolean isCorrect =
                        Boolean.TRUE.equals(
                                selectedAnswer.getIsCorrect()
                        );

                if (isCorrect) {
                correctCount++;
                }

                userAnswers.add(
                        UserAnswer.builder()
                                .user(user)
                                .question(question)
                                .selectedAnswer(selectedAnswer)
                                .quizSubmission(submission)
                                .isCorrect(isCorrect)
                                .submittedAt(LocalDateTime.now())
                                .build()
                );
        }

        int totalQuestions = questions.size();

        int answeredQuestions =
                request.getAnswers().size();

        int skippedQuestions =
                totalQuestions - answeredQuestions;

        double score =
                totalQuestions == 0
                        ? 0
                        : ((double) correctCount / totalQuestions) * 100;

        boolean passed =
                score >= quiz.getPassingScore();

        submission.setAnswers(userAnswers);
        submission.setTotalQuestions(totalQuestions);
        submission.setCorrectAnswers(correctCount);
        submission.setAnsweredQuestions(answeredQuestions);
        submission.setSkippedQuestions(skippedQuestions);
        submission.setScore(score);
        submission.setPassed(passed);

        QuizSubmission savedSubmission =
                quizSubmissionRepository.save(
                        submission
                );

        return quizSubmissionMapper
                .toResponse(savedSubmission);
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
