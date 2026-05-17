package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.dto.request.CategoryRequest.*;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.*;
import com.brainedu.BrainEdu.service.categoryService.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/fields")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService
            categoryService;

    @PostMapping
    public ApiResponse<CategoryResponse>
    create(
            @RequestBody
            CategoryRequest request
    ) {

        return ApiResponse
                .<CategoryResponse>builder()

                .success(true)

                .message(
                        "Category created successfully"
                )

                .data(
                        categoryService.create(
                                request
                        )
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping
    public ApiResponse<List<CategoryResponse>>
    getAll() {

        return ApiResponse
                .<List<CategoryResponse>>builder()

                .success(true)

                .message(
                        "Categories fetched successfully"
                )

                .data(
                        categoryService.getAll()
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryResponse>
    getById(
            @PathVariable Long id
    ) {

        return ApiResponse
                .<CategoryResponse>builder()

                .success(true)

                .message(
                        "Category fetched successfully"
                )

                .data(
                        categoryService.getById(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<CategoryResponse>
    update(
            @PathVariable Long id,

            @RequestBody
            CategoryRequest request
    ) {

        return ApiResponse
                .<CategoryResponse>builder()

                .success(true)

                .message(
                        "Category updated successfully"
                )

                .data(
                        categoryService.update(
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
                        "Category deleted successfully"
                )

                .data(
                        categoryService.delete(id)
                )

                .timestamp(
                        LocalDateTime.now()
                )

                .build();
    }
}