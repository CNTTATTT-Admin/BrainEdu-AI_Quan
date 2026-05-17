package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.dto.request.QuizRequest.QuizRequest;
import com.brainedu.BrainEdu.dto.response.QuizResponse.QuizResponse;
import com.brainedu.BrainEdu.service.quizService.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService
            quizService;

    @PostMapping
    public ApiResponse<QuizResponse>
    create(
            @RequestBody
            QuizRequest request
    ) {

        return ApiResponse
                .<QuizResponse>builder()

                .success(true)

                .message(
                        "Quiz created successfully"
                )

                .data(
                        quizService.create(
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
    public ApiResponse<List<QuizResponse>>
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

        Page<QuizResponse> quizzes =
                quizService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                quizzes.getNumber()
                        )

                        .size(
                                quizzes.getSize()
                        )

                        .totalElements(
                                quizzes
                                        .getTotalElements()
                        )

                        .totalPages(
                                quizzes
                                        .getTotalPages()
                        )

                        .hasNext(
                                quizzes.hasNext()
                        )

                        .hasPrevious(
                                quizzes
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<QuizResponse>>builder()

                .success(true)

                .message(
                        "Quizzes fetched successfully"
                )

                .data(
                        quizzes.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<QuizResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<QuizResponse>builder()

                .success(true)

                .message(
                        "Quiz fetched successfully"
                )

                .data(
                        quizService.getById(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/lesson/{lessonId}")
    public ApiResponse<List<QuizResponse>>
    getByLesson(

            @PathVariable Long lessonId,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<QuizResponse> quizzes =
                quizService.getByLesson(
                        lessonId,
                        page,
                        size
                );

        PaginationMeta meta =
                PaginationMeta.builder()

                        .page(
                                quizzes.getNumber()
                        )

                        .size(
                                quizzes.getSize()
                        )

                        .totalElements(
                                quizzes
                                        .getTotalElements()
                        )

                        .totalPages(
                                quizzes
                                        .getTotalPages()
                        )

                        .hasNext(
                                quizzes.hasNext()
                        )

                        .hasPrevious(
                                quizzes
                                        .hasPrevious()
                        )

                        .build();

        return ApiResponse
                .<List<QuizResponse>>builder()

                .success(true)

                .message(
                        "Quizzes by lesson fetched successfully"
                )

                .data(
                        quizzes.getContent()
                )

                .meta(meta)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<QuizResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            QuizRequest request
    ) {

        return ApiResponse
                .<QuizResponse>builder()

                .success(true)

                .message(
                        "Quiz updated successfully"
                )

                .data(
                        quizService.update(
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
                        "Quiz deleted successfully"
                )

                .data(
                        quizService.delete(id)
                )

                .meta(null)

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}