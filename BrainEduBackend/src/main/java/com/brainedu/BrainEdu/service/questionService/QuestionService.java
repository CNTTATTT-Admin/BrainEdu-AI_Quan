package com.brainedu.BrainEdu.service.questionService;

import com.brainedu.BrainEdu.dto.request.QuestionRequest.*;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface QuestionService {

    QuestionResponse create(
            QuestionRequest request
    );

    Page<QuestionResponse> getAll(int page, int size);

    QuestionResponse getById(
            Long id
    );

    Page<QuestionResponse> getByQuiz(
            Long quizId,
            int page,
            int size
    );

    Page<QuestionResponse> getBySkill(
            Long skillId,
            int page,
            int size
    );

    QuestionResponse update(
            Long id,
            QuestionRequest request
    );

    String delete(
            Long id
    );
}