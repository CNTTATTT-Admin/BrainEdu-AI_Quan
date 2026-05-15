package com.brainedu.BrainEdu.service.quizService;

import com.brainedu.BrainEdu.dto.request.QuizRequest.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.*;

import java.util.List;

public interface QuizService {

    QuizResponse create(
            QuizRequest request
    );

    List<QuizResponse> getAll();

    QuizResponse getById(
            Long id
    );

    List<QuizResponse> getByLesson(
            Long lessonId
    );

    QuizResponse update(
            Long id,
            QuizRequest request
    );

    String delete(
            Long id
    );
}