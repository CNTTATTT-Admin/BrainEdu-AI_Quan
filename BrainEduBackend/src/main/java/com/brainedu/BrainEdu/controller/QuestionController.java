package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.QuestionRequest.*;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.*;
import com.brainedu.BrainEdu.service.questionService.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService
            questionService;

    @PostMapping
    public ApiResponse<QuestionResponse>
    create(
            @RequestBody
            QuestionRequest request
    ) {

        return ApiResponse
                .<QuestionResponse>builder()

                .success(true)

                .message(
                        "Question created successfully"
                )

                .data(
                        questionService.create(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<QuestionResponse>>
    getAll() {

        return ApiResponse
                .<List<QuestionResponse>>builder()

                .success(true)

                .message(
                        "Questions fetched successfully"
                )

                .data(
                        questionService.getAll()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<QuestionResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<QuestionResponse>builder()

                .success(true)

                .message(
                        "Question fetched successfully"
                )

                .data(
                        questionService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/quiz/{quizId}")
    public ApiResponse<List<QuestionResponse>>
    getByQuiz(
            @PathVariable Long quizId
    ) {

        return ApiResponse
                .<List<QuestionResponse>>builder()

                .success(true)

                .message(
                        "Questions by quiz fetched successfully"
                )

                .data(
                        questionService.getByQuiz(
                                quizId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/skill/{skillId}")
    public ApiResponse<List<QuestionResponse>>
    getBySkill(
            @PathVariable Long skillId
    ) {

        return ApiResponse
                .<List<QuestionResponse>>builder()

                .success(true)

                .message(
                        "Questions by skill fetched successfully"
                )

                .data(
                        questionService.getBySkill(
                                skillId
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<QuestionResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            QuestionRequest request
    ) {

        return ApiResponse
                .<QuestionResponse>builder()

                .success(true)

                .message(
                        "Question updated successfully"
                )

                .data(
                        questionService.update(
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
                        "Question deleted successfully"
                )

                .data(
                        questionService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}