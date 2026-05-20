package com.brainedu.BrainEdu.service.quizSubmissionService;

import com.brainedu.BrainEdu.dto.request.QuizRequest.SubmitQuizRequest;
import com.brainedu.BrainEdu.dto.response.QuizSubmissionResponse.QuizSubmissionResponse;
import org.springframework.data.domain.Page;

public interface QuizSubmissionService {

    QuizSubmissionResponse submitQuiz(
            SubmitQuizRequest request
    );

    Page<QuizSubmissionResponse> getMyResults(
            int page,
            int size
    );

    QuizSubmissionResponse getResult(
            Long id
    );
}
