package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.QuizRequest.QuizRequest;
import com.brainedu.BrainEdu.dto.response.QuizResponse.QuizResponse;
import com.brainedu.BrainEdu.service.quizService.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

        return ResponseFactory.success(
                "Quiz created successfully",
                quizService.create(
                        request
                )
        );
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
                ResponseFactory.pagination(
                        quizzes
                );

        return ResponseFactory.success(
                "Quizzes fetched successfully",
                quizzes.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<QuizResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Quiz fetched successfully",
                quizService.getById(id)
        );
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
                ResponseFactory.pagination(
                        quizzes
                );

        return ResponseFactory.success(
                "Quizzes by lesson fetched successfully",
                quizzes.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<QuizResponse>
    update(

            @PathVariable Long id,

            @RequestBody
            QuizRequest request
    ) {

        return ResponseFactory.success(
                "Quiz updated successfully",
                quizService.update(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String>
    delete(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Quiz deleted successfully",
                quizService.delete(id)
        );
    }
}