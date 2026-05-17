package com.brainedu.BrainEdu.service.answerService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.AnswerResponse.*;
import com.brainedu.BrainEdu.entity.Answer;
import com.brainedu.BrainEdu.entity.Question;
import com.brainedu.BrainEdu.mapper.AnswerMapper;
import com.brainedu.BrainEdu.mapper.UserMapper;
import com.brainedu.BrainEdu.repository.AnswerRepository;
import com.brainedu.BrainEdu.repository.QuestionRepository;
import com.brainedu.BrainEdu.service.answerService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl
        implements AnswerService {

    private final AnswerRepository
            answerRepository;

    private final QuestionRepository
            questionRepository;

    private final AnswerMapper
            answerMapper;

    @Override
    public AnswerResponse create(
            AnswerRequest request
    ) {

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
                Answer.builder()

                        .question(question)

                        .answerText(
                                request.getAnswerText()
                        )

                        .isCorrect(
                                request.getIsCorrect()
                        )

                        .build();

        answerRepository.save(answer);

        return answerMapper.toResponse(
                answer
        );
    }

    @Override
    public Page<AnswerResponse> getAll(int page, int size) {
        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );
        return answerRepository
                .findAll(pageable)
                .map(answerMapper::toResponse);
    }

    @Override
    public AnswerResponse getById(
            Long id
    ) {

        Answer answer =
                answerRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Answer not found"
                                )
                        );

        return answerMapper.toResponse(
                answer
        );
    }

    @Override
    public Page<AnswerResponse> getByQuestion(
            Long questionId,
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );

        return answerRepository
                .findByQuestionId(
                        questionId,
                        pageable
                )
                .map(
                        answerMapper::toResponse
                );
    }

    @Override
    public AnswerResponse update(
            Long id,
            AnswerRequest request
    ) {

        Answer answer =
                answerRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Answer not found"
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

        answer.setQuestion(question);

        answer.setAnswerText(
                request.getAnswerText()
        );

        answer.setIsCorrect(
                request.getIsCorrect()
        );

        answerRepository.save(answer);

        return answerMapper.toResponse(
                answer
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        Answer answer =
                answerRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Answer not found"
                                )
                        );

        answerRepository.delete(answer);

        return "Answer deleted successfully";
    }
}