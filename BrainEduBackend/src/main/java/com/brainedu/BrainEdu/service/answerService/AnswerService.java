package com.brainedu.BrainEdu.service.answerService;

import com.brainedu.BrainEdu.dto.request.AnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.AnswerResponse.*;

import java.util.List;

public interface AnswerService {

    AnswerResponse create(
            AnswerRequest request
    );

    List<AnswerResponse> getAll();

    AnswerResponse getById(
            Long id
    );

    List<AnswerResponse> getByQuestion(
            Long questionId
    );

    AnswerResponse update(
            Long id,
            AnswerRequest request
    );

    String delete(
            Long id
    );
}