package com.brainedu.BrainEdu.service.userAnswerService;

import com.brainedu.BrainEdu.dto.request.UserAnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.*;

import java.util.List;

public interface UserAnswerService {

    UserAnswerResponse submit(
            UserAnswerRequest request
    );

    List<UserAnswerResponse> getAll();

    UserAnswerResponse getById(
            Long id
    );

    List<UserAnswerResponse> getByUser(
            Long userId
    );

    List<UserAnswerResponse> getByQuestion(
            Long questionId
    );

    String delete(
            Long id
    );
}