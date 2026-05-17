package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.UserAnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.*;
import com.brainedu.BrainEdu.service.userAnswerService.UserAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user-answers")
@RequiredArgsConstructor
public class UserAnswerController {

    private final UserAnswerService
            userAnswerService;

    @PostMapping
    public ApiResponse<UserAnswerResponse>
    submit(
            @RequestBody
            UserAnswerRequest request
    ) {

        return ApiResponse
                .<UserAnswerResponse>builder()

                .success(true)

                .message(
                        "User answer submitted successfully"
                )

                .data(
                        userAnswerService.submit(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<UserAnswerResponse>>
    getAll() {

        return ApiResponse
                .<List<UserAnswerResponse>>builder()

                .success(true)

                .message(
                        "User answers fetched successfully"
                )

                .data(
                        userAnswerService.getAll()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<UserAnswerResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<UserAnswerResponse>builder()

                .success(true)

                .message(
                        "User answer fetched successfully"
                )

                .data(
                        userAnswerService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<UserAnswerResponse>>
    getByUser(
            @PathVariable Long userId
    ) {

        return ApiResponse
                .<List<UserAnswerResponse>>builder()

                .success(true)

                .message(
                        "User answers by user fetched successfully"
                )

                .data(
                        userAnswerService.getByUser(
                                userId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/question/{questionId}")
    public ApiResponse<List<UserAnswerResponse>>
    getByQuestion(
            @PathVariable Long questionId
    ) {

        return ApiResponse
                .<List<UserAnswerResponse>>builder()

                .success(true)

                .message(
                        "User answers by question fetched successfully"
                )

                .data(
                        userAnswerService.getByQuestion(
                                questionId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<String>builder()

                .success(true)

                .message(
                        "User answer deleted successfully"
                )

                .data(
                        userAnswerService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}