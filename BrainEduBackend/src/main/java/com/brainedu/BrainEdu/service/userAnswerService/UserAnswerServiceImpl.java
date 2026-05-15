package com.brainedu.BrainEdu.service.userAnswerService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.UserAnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.*;
import com.brainedu.BrainEdu.entity.Answer;
import com.brainedu.BrainEdu.entity.Question;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.entity.UserAnswer;
import com.brainedu.BrainEdu.mapper.UserAnswerMapper;
import com.brainedu.BrainEdu.repository.AnswerRepository;
import com.brainedu.BrainEdu.repository.QuestionRepository;
import com.brainedu.BrainEdu.repository.UserAnswerRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAnswerServiceImpl
        implements UserAnswerService {

    private final UserAnswerRepository
            userAnswerRepository;

    private final UserRepository
            userRepository;

    private final QuestionRepository
            questionRepository;

    private final AnswerRepository
            answerRepository;

    private final UserAnswerMapper
            userAnswerMapper;

    @Override
    public UserAnswerResponse submit(
            UserAnswerRequest request
    ) {

        User user =
                userRepository.findById(
                                request.getUserId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        Question question =
                questionRepository.findById(
                                request.getQuestionId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Question not found"
                                )
                        );

        Answer answer =
                answerRepository.findById(
                                request.getSelectedAnswerId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Answer not found"
                                )
                        );

        if (!answer.getQuestion()
                .getId()
                .equals(question.getId())) {

            throw new ApiException(
                    "Answer does not belong to question"
            );
        }

        Boolean isCorrect =
                answer.getIsCorrect();

        UserAnswer userAnswer =
                UserAnswer.builder()

                        .user(user)

                        .question(question)

                        .selectedAnswer(answer)

                        .isCorrect(isCorrect)

                        .responseTime(
                                request.getResponseTime()
                        )

                        .submittedAt(
                                LocalDateTime.now()
                        )

                        .build();

        userAnswerRepository.save(
                userAnswer
        );

        return userAnswerMapper.toResponse(
                userAnswer
        );
    }

    @Override
    public List<UserAnswerResponse> getAll() {

        return userAnswerRepository.findAll()
                .stream()
                .map(
                        userAnswerMapper::toResponse
                )
                .toList();
    }

    @Override
    public UserAnswerResponse getById(
            Long id
    ) {

        UserAnswer userAnswer =
                userAnswerRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User answer not found"
                                )
                        );

        return userAnswerMapper.toResponse(
                userAnswer
        );
    }

    @Override
    public List<UserAnswerResponse> getByUser(
            Long userId
    ) {

        return userAnswerRepository
                .findByUserId(
                        userId
                )
                .stream()
                .map(
                        userAnswerMapper::toResponse
                )
                .toList();
    }

    @Override
    public List<UserAnswerResponse> getByQuestion(
            Long questionId
    ) {

        return userAnswerRepository
                .findByQuestionId(
                        questionId
                )
                .stream()
                .map(
                        userAnswerMapper::toResponse
                )
                .toList();
    }

    @Override
    public String delete(
            Long id
    ) {

        UserAnswer userAnswer =
                userAnswerRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User answer not found"
                                )
                        );

        userAnswerRepository.delete(
                userAnswer
        );

        return "User answer deleted successfully";
    }
}