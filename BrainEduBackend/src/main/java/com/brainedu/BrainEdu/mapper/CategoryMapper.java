package com.brainedu.BrainEdu.mapper;

import com.brainedu.BrainEdu.dto.request.CategoryRequest.CategoryRequest;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.CategoryResponse;
import com.brainedu.BrainEdu.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toEntity(
            CategoryRequest request
    );

    CategoryResponse toResponse(
            Category category
    );

    void updateEntity(
            @MappingTarget
            Category category,

            CategoryRequest request
    );
}