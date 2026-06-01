package com.brainedu.BrainEdu.service.questionService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.QuestionRequest.*;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.*;
import com.brainedu.BrainEdu.entity.Question;
import com.brainedu.BrainEdu.entity.Quiz;
import com.brainedu.BrainEdu.entity.Skill;
import com.brainedu.BrainEdu.mapper.QuestionMapper;
import com.brainedu.BrainEdu.repository.QuestionRepository;
import com.brainedu.BrainEdu.repository.QuizRepository;
import com.brainedu.BrainEdu.repository.SkillRepository;
import com.brainedu.BrainEdu.service.questionService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl
        implements QuestionService {

    private final QuestionRepository
            questionRepository;

    private final QuizRepository
            quizRepository;

    private final SkillRepository
            skillRepository;

    private final QuestionMapper
            questionMapper;

    @Override
    public QuestionResponse create(
            QuestionRequest request
    ) {

        Quiz quiz =
                quizRepository.findById(
                                request.getQuizId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz not found"
                                )
                        );

        Skill skill =
                skillRepository.findById(
                                request.getSkillId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Skill not found"
                                )
                        );

        Question question =
                Question.builder()

                        .quiz(quiz)

                        .skill(skill)

                        .questionText(
                                request.getQuestionText()
                        )

                        .difficultyLevel(
                                request.getDifficultyLevel()
                        )

                        .questionType(
                                request.getQuestionType()
                        )

                        .weightScore(
                                request.getWeightScore().floatValue()
                        )

                        .build();

        questionRepository.save(question);

        return questionMapper.toResponse(
                question
        );
    }

    @Override
    public Page<QuestionResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return questionRepository.findAll(pageable)
                .map(
                        questionMapper::toResponse
                );
    }

    @Override
    public QuestionResponse getById(
            Long id
    ) {

        Question question =
                questionRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Question not found"
                                )
                        );

        return questionMapper.toResponse(
                question
        );
    }

    @Override
        public List<QuestionResponse> getByQuiz(Long quizId) {

        return questionRepository
                .findByQuizId(quizId)
                .stream()
                .map(questionMapper::toResponse)
                .toList();
        }

    @Override
    public Page<QuestionResponse> getBySkill(
            Long skillId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return questionRepository
                .findBySkillId(
                        skillId,
                        pageable
                )
                .map(
                        questionMapper::toResponse
                );
    }

    @Override
    public QuestionResponse update(
            Long id,
            QuestionRequest request
    ) {

        Question question =
                questionRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Question not found"
                                )
                        );

        Quiz quiz =
                quizRepository.findById(
                                request.getQuizId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Quiz not found"
                                )
                        );

        Skill skill =
                skillRepository.findById(
                                request.getSkillId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Skill not found"
                                )
                        );

        question.setQuiz(quiz);

        question.setSkill(skill);

        question.setQuestionText(
                request.getQuestionText()
        );

        question.setDifficultyLevel(
                request.getDifficultyLevel()
        );

        question.setQuestionType(
                request.getQuestionType()
        );

        question.setWeightScore(
                request.getWeightScore().floatValue()
        );

        questionRepository.save(question);

        return questionMapper.toResponse(
                question
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        Question question =
                questionRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Question not found"
                                )
                        );

        questionRepository.delete(question);

        return "Question deleted successfully";
    }
}