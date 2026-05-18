package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.common.response.ApiResponse;
import com.brainedu.BrainEdu.common.response.PaginationMeta;
import com.brainedu.BrainEdu.common.response.ResponseFactory;
import com.brainedu.BrainEdu.dto.request.CategoryRequest.CategoryRequest;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.CategoryResponse;
import com.brainedu.BrainEdu.service.categoryService.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

        return ResponseFactory.success(
                "Category created successfully",
                categoryService.create(request)
        );
    }

    @GetMapping
    public ApiResponse<List<CategoryResponse>>
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

        Page<CategoryResponse> categories =
                categoryService.getAll(
                        page,
                        size
                );

        PaginationMeta meta =
                ResponseFactory.pagination(
                        categories
                );

        return ResponseFactory.success(
                "Categories fetched successfully",
                categories.getContent(),
                meta
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryResponse>
    getById(
            @PathVariable Long id
    ) {

        return ResponseFactory.success(
                "Category fetched successfully",
                categoryService.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<CategoryResponse>
    update(

            @PathVariable Long id,

            @RequestBody
            CategoryRequest request
    ) {

        return ResponseFactory.success(
                "Category updated successfully",
                categoryService.update(
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
                "Category deleted successfully",
                categoryService.delete(id)
        );
    }
}