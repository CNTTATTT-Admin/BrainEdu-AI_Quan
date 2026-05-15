package com.brainedu.BrainEdu.service.questionService;

import com.brainedu.BrainEdu.dto.request.QuestionRequest.*;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.*;

import java.util.List;

public interface QuestionService {

    QuestionResponse create(
            QuestionRequest request
    );

    List<QuestionResponse> getAll();

    QuestionResponse getById(
            Long id
    );

    List<QuestionResponse> getByQuiz(
            Long quizId
    );

    List<QuestionResponse> getBySkill(
            Long skillId
    );

    QuestionResponse update(
            Long id,
            QuestionRequest request
    );

    String delete(
            Long id
    );
}