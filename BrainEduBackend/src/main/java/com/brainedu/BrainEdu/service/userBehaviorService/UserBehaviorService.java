package com.brainedu.BrainEdu.service.userBehaviorService;

import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.UserBehaviorRequest;
import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.UserBehaviorResponse;

public interface UserBehaviorService {

    UserBehaviorResponse trackBehavior(
            UserBehaviorRequest request
    );
}