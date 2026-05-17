package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                answers.getNumber()
                        )

                        .size(
                                answers.getSize()
                        )

                        .totalElements(
                                answers
                                        .getTotalElements()
                        )

                        .totalPages(
                                answers
                                        .getTotalPages()
                        )

                        .hasNext(
                                answers.hasNext()
                        )

                        .hasPrevious(
                                answers
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserAnswerResponse>>builder()

                .success(true)

                .message(
                        "User answers fetched successfully"
                )

                .data(
                        answers.getContent()
                )

                .meta(meta)

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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                answers.getNumber()
                        )

                        .size(
                                answers.getSize()
                        )

                        .totalElements(
                                answers
                                        .getTotalElements()
                        )

                        .totalPages(
                                answers
                                        .getTotalPages()
                        )

                        .hasNext(
                                answers.hasNext()
                        )

                        .hasPrevious(
                                answers
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserAnswerResponse>>builder()

                .success(true)

                .message(
                        "User answers by user fetched successfully"
                )

                .data(
                        answers.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
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

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                answers.getNumber()
                        )

                        .size(
                                answers.getSize()
                        )

                        .totalElements(
                                answers
                                        .getTotalElements()
                        )

                        .totalPages(
                                answers
                                        .getTotalPages()
                        )

                        .hasNext(
                                answers.hasNext()
                        )

                        .hasPrevious(
                                answers
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<UserAnswerResponse>>builder()

                .success(true)

                .message(
                        "User answers by question fetched successfully"
                )

                .data(
                        answers.getContent()
                )

                .meta(meta)

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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}