package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.request.CategoryRequest.*;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toEntity(
            CategoryRequest request
    ) {

        return Category.builder()
                .categoryName(
                        request.getCategoryName()
                )
                .description(
                        request.getDescription()
                )
                .build();
    }

    public CategoryResponse toResponse(
            Category category
    ) {

        return CategoryResponse.builder()
                .id(category.getId())
                .categoryName(
                        category.getCategoryName()
                )
                .description(
                        category.getDescription()
                )
                .build();
    }

    public void updateEntity(
            Category category,
            CategoryRequest request
    ) {

        category.setCategoryName(
                request.getCategoryName()
        );

        category.setDescription(
                request.getDescription()
        );
    }
}