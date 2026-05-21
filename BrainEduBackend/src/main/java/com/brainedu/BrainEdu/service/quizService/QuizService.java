package com.brainedu.BrainEdu.service.quizService;

import com.brainedu.BrainEdu.dto.request.QuizRequest.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface QuizService {

    QuizResponse create(
            QuizRequest request
    );

    Page<QuizResponse> getAll(int page, int size);

    QuizResponse getById(
            Long id
    );

    Page<QuizResponse> getByLesson(
            Long lessonId,
            int page,
            int size
    );

    List<QuizQuestionAnswerResponse>
    getQuizQuestions(
            Long quizId
    );

    QuizResponse update(
            Long id,
            QuizRequest request
    );

    String delete(
            Long id
    );
}