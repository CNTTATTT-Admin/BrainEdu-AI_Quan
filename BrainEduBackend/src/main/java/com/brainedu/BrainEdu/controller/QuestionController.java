package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.QuestionRequest.QuestionRequest;
import com.brainedu.BrainEdu.dto.response.QuestionResponse.QuestionResponse;
import com.brainedu.BrainEdu.service.questionService.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
            @Valid
            @RequestBody
            QuestionRequest request
    ) {

        return ResponseFactory.success(
                "Question created successfully",
                questionService.create(
                        request
                )
        );
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
                ResponseFactory.pagination(
                        questions
                );

        return ResponseFactory.success(
                "Questions fetched successfully",
                questions.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<QuestionResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Question fetched successfully",
                questionService.getById(id)
        );
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
                ResponseFactory.pagination(
                        questions
                );

        return ResponseFactory.success(
                "Questions by quiz fetched successfully",
                questions.getContent(),
                meta
        );
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
                ResponseFactory.pagination(
                        questions
                );

        return ResponseFactory.success(
                "Questions by skill fetched successfully",
                questions.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<QuestionResponse>
    update(
            @Valid
            @PathVariable Long id,

            @RequestBody
            QuestionRequest request
    ) {

        return ResponseFactory.success(
                "Question updated successfully",
                questionService.update(
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
                "Question deleted successfully",
                questionService.delete(id)
        );
    }
}