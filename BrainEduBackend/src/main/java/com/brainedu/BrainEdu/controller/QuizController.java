package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.QuizRequest.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.*;
import com.brainedu.BrainEdu.service.quizService.QuizService;
import lombok.RequiredArgsConstructor;
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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<QuizResponse>>
    getAll() {

        return ApiResponse
                .<List<QuizResponse>>builder()

                .success(true)

                .message(
                        "Quizzes fetched successfully"
                )

                .data(
                        quizService.getAll()
                )

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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/lesson/{lessonId}")
    public ApiResponse<List<QuizResponse>>
    getByLesson(
            @PathVariable Long lessonId
    ) {

        return ApiResponse
                .<List<QuizResponse>>builder()

                .success(true)

                .message(
                        "Quizzes by lesson fetched successfully"
                )

                .data(
                        quizService.getByLesson(
                                lessonId
                        )
                )

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

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}