package com.brainedu.BrainEdu.controller;

import com.brainedu.BrainEdu.dto.request.CategoryRequest.*;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.*;
import com.brainedu.BrainEdu.service.categoryService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fields")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService
            categoryService;

    @PostMapping
    public CategoryResponse create(
            @RequestBody
            CategoryRequest request
    ) {

        return categoryService.create(
                request
        );
    }

    @GetMapping
    public List<CategoryResponse> getAll() {

        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public CategoryResponse getById(
            @PathVariable Long id
    ) {

        return categoryService.getById(id);
    }

    @PutMapping("/{id}")
    public CategoryResponse update(
            @PathVariable Long id,
            @RequestBody CategoryRequest request
    ) {

        return categoryService.update(
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    public String delete(
            @PathVariable Long id
    ) {

        return categoryService.delete(id);
    }
}