package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.UserBehaviorRequest;
import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.UserBehaviorResponse;
import com.brainedu.BrainEdu.service.userBehaviorService.UserBehaviorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/behavior")
public class UserBehaviorController {

    private final UserBehaviorService
            userBehaviorService;

    @PostMapping("/track")
    public UserBehaviorResponse trackBehavior(
            @RequestBody
            UserBehaviorRequest request
    ) {

        return userBehaviorService
                .trackBehavior(request);
    }
}