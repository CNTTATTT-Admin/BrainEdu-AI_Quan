package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.AnswerRequest.AnswerRequest;
import com.brainedu.BrainEdu.dto.response.AnswerResponse.AnswerResponse;
import com.brainedu.BrainEdu.service.answerService.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

        return ResponseFactory.success(
                "Answer created successfully",
                answerService.create(request)
        );
    }

    @GetMapping
    public ApiResponse<List<AnswerResponse>>
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

        Page<AnswerResponse> answers =
                answerService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        answers
                );

        return ResponseFactory.success(
                "Answers fetched successfully",
                answers.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<AnswerResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Answer fetched successfully",
                answerService.getById(id)
        );
    }

    @GetMapping("/question/{questionId}")
    public ApiResponse<List<AnswerResponse>>
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

        Page<AnswerResponse> answers =
                answerService.getByQuestion(
                        questionId,
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        answers
                );

        return ResponseFactory.success(
                "Answers by question fetched successfully",
                answers.getContent(),
                meta
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<AnswerResponse>
    update(

            @PathVariable Long id,

            @RequestBody
            AnswerRequest request
    ) {

        return ResponseFactory.success(
                "Answer updated successfully",
                answerService.update(
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
                "Answer deleted successfully",
                answerService.delete(id)
        );
    }
}