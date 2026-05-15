package com.brainedu.BrainEdu.service.categoryService;

import com.brainedu.BrainEdu.dto.request.CategoryRequest.*;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.*;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(
            CategoryRequest request
    );

    List<CategoryResponse> getAll();

    CategoryResponse getById(
            Long id
    );

    CategoryResponse update(
            Long id,
            CategoryRequest request
    );

    String delete(
            Long id
    );
}