package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.UserAnswerRequest.UserAnswerRequest;
import com.brainedu.BrainEdu.dto.response.UserAnswerResponse.UserAnswerResponse;
import com.brainedu.BrainEdu.service.userAnswerService.UserAnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

        return ResponseFactory.success(
                "User answer submitted successfully",
                userAnswerService.submit(request)
        );
    }

    @GetMapping
    public ApiResponse<List<UserAnswerResponse>>
    getAll(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserAnswerResponse> answers =
                userAnswerService.getAll(
                        page,
                        size
                );

        return ResponseFactory.success(
                "User answers fetched successfully",
                answers.getContent(),
                ResponseFactory.pagination(answers)
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<UserAnswerResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "User answer fetched successfully",
                userAnswerService.getById(id)
        );
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<UserAnswerResponse>>
    getByUser(

            @PathVariable Long userId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserAnswerResponse> answers =
                userAnswerService.getByUser(
                        userId,
                        page,
                        size
                );

        return ResponseFactory.success(
                "User answers by user fetched successfully",
                answers.getContent(),
                ResponseFactory.pagination(answers)
        );
    }

    @GetMapping("/question/{questionId}")
    public ApiResponse<List<UserAnswerResponse>>
    getByQuestion(

            @PathVariable Long questionId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<UserAnswerResponse> answers =
                userAnswerService.getByQuestion(
                        questionId,
                        page,
                        size
                );

        return ResponseFactory.success(
                "User answers by question fetched successfully",
                answers.getContent(),
                ResponseFactory.pagination(answers)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "User answer deleted successfully",
                userAnswerService.delete(id)
        );
    }
}