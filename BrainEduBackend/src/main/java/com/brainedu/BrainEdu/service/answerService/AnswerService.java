package com.brainedu.BrainEdu.service.answerService;

import com.brainedu.BrainEdu.dto.request.AnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.AnswerResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AnswerService {

    AnswerResponse create(
            AnswerRequest request
    );

    Page<AnswerResponse> getAll(int page, int size);

    AnswerResponse getById(
            Long id
    );

    Page<AnswerResponse> getByQuestion(
            Long questionId,
            int page,
            int size
    );

    AnswerResponse update(
            Long id,
            AnswerRequest request
    );

    String delete(
            Long id
    );
}