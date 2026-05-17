package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.AnswerRequest.*;
import com.brainedu.BrainEdu.dto.response.AnswerResponse.*;
import com.brainedu.BrainEdu.service.answerService.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService
            answerService;

    @PostMapping
    public ApiResponse<AnswerResponse>
    create(
            @RequestBody
            AnswerRequest request
    ) {

        return ApiResponse
                .<AnswerResponse>builder()

                .success(true)

                .message(
                        "Answer created successfully"
                )

                .data(
                        answerService.create(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<AnswerResponse>>
    getAll() {

        return ApiResponse
                .<List<AnswerResponse>>builder()

                .success(true)

                .message(
                        "Answers fetched successfully"
                )

                .data(
                        answerService.getAll()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<AnswerResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<AnswerResponse>builder()

                .success(true)

                .message(
                        "Answer fetched successfully"
                )

                .data(
                        answerService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/question/{questionId}")
    public ApiResponse<List<AnswerResponse>>
    getByQuestion(
            @PathVariable Long questionId
    ) {

        return ApiResponse
                .<List<AnswerResponse>>builder()

                .success(true)

                .message(
                        "Answers by question fetched successfully"
                )

                .data(
                        answerService.getByQuestion(
                                questionId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<AnswerResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            AnswerRequest request
    ) {

        return ApiResponse
                .<AnswerResponse>builder()

                .success(true)

                .message(
                        "Answer updated successfully"
                )

                .data(
                        answerService.update(
                                id,
                                request
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
                        "Answer deleted successfully"
                )

                .data(
                        answerService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}