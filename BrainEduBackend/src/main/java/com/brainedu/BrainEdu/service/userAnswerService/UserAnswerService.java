package com.brainedu.BrainEdu.service.userAnswerService;

import com.brainedu.BrainEdu.dto.request.UserAnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserAnswerService {

    UserAnswerResponse submit(
            UserAnswerRequest request
    );

    Page<UserAnswerResponse> getAll(int page, int size);

    UserAnswerResponse getById(
            Long id
    );

    Page<UserAnswerResponse> getByUser(
            Long userId,
            int page,
            int size
    );

    Page<UserAnswerResponse> getByQuestion(
            Long questionId,
            int page,
            int size
    );

    String delete(
            Long id
    );
}