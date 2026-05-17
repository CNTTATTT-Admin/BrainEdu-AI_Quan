package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.QuestionRequest.QuestionRequest;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.QuestionResponse;
import com.brainedu.BrainEdu.service.questionService.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<QuestionResponse>>
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

        Page<QuestionResponse> questions =
                questionService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                questions.getNumber()
                        )

                        .size(
                                questions.getSize()
                        )

                        .totalElements(
                                questions
                                        .getTotalElements()
                        )

                        .totalPages(
                                questions
                                        .getTotalPages()
                        )

                        .hasNext(
                                questions.hasNext()
                        )

                        .hasPrevious(
                                questions
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<QuestionResponse>>builder()

                .success(true)

                .message(
                        "Questions fetched successfully"
                )

                .data(
                        questions.getContent()
                )

                .meta(meta)

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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/quiz/{quizId}")
    public ApiResponse<List<QuestionResponse>>
    getByQuiz(

            @PathVariable Long quizId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<QuestionResponse> questions =
                questionService.getByQuiz(
                        quizId,
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                questions.getNumber()
                        )

                        .size(
                                questions.getSize()
                        )

                        .totalElements(
                                questions
                                        .getTotalElements()
                        )

                        .totalPages(
                                questions
                                        .getTotalPages()
                        )

                        .hasNext(
                                questions.hasNext()
                        )

                        .hasPrevious(
                                questions
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<QuestionResponse>>builder()

                .success(true)

                .message(
                        "Questions by quiz fetched successfully"
                )

                .data(
                        questions.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/skill/{skillId}")
    public ApiResponse<List<QuestionResponse>>
    getBySkill(

            @PathVariable Long skillId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<QuestionResponse> questions =
                questionService.getBySkill(
                        skillId,
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                questions.getNumber()
                        )

                        .size(
                                questions.getSize()
                        )

                        .totalElements(
                                questions
                                        .getTotalElements()
                        )

                        .totalPages(
                                questions
                                        .getTotalPages()
                        )

                        .hasNext(
                                questions.hasNext()
                        )

                        .hasPrevious(
                                questions
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<QuestionResponse>>builder()

                .success(true)

                .message(
                        "Questions by skill fetched successfully"
                )

                .data(
                        questions.getContent()
                )

                .meta(meta)

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

                .meta(null)

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

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}