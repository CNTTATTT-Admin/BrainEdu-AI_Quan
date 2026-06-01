package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.SubmitQuizRequest.java.*;
import com.brainedu.BrainEdu.dto.response.QuizResponse.QuizReviewResponse;
import com.brainedu.BrainEdu.dto.response.QuizSubmissionResponse.*;
import com.brainedu.BrainEdu.service.quizSubmissionService.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quiz-submissions")
@RequiredArgsConstructor
public class QuizSubmissionController {

    private final QuizSubmissionService
            quizSubmissionService;

    @PostMapping("/submit")
    public ApiResponse<QuizSubmissionResponse>
    submitQuiz(

            @Valid
            @RequestBody
            SubmitQuizRequest request
    ) {

        return ResponseFactory.success(
                "Quiz submitted successfully",
                quizSubmissionService.submitQuiz(
                        request
                )
        );
    }

    @GetMapping("/my-results")
    public ApiResponse<List<QuizSubmissionResponse>>
    getMyResults(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        Page<QuizSubmissionResponse> results =
                quizSubmissionService
                        .getMyResults(
                                page,
                                size
                        );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        results
                );

        return ResponseFactory.success(
                "Quiz results fetched successfully",
                results.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<QuizSubmissionResponse>
    getResult(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Quiz result fetched successfully",
                quizSubmissionService.getResult(
                        id
                )
        );
    }

    @GetMapping("/{id}/review")
    public ApiResponse<QuizReviewResponse>
    getReview(
            @PathVariable Long id
    ) {
        return ResponseFactory.success(
                "Quiz review fetched successfully",
                quizSubmissionService .getReview(
                        id
                )
        );
    }
}

