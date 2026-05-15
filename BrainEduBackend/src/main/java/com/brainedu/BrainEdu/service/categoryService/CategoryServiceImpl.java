package com.brainedu.BrainEdu.service.categoryService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.CategoryRequest.*;
import com.brainedu.BrainEdu.dto.response.CategoryResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.mapper.CategoryMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository
            categoryRepository;

    private final CategoryMapper
            categoryMapper;

    @Override
    public CategoryResponse create(
            CategoryRequest request
    ) {

        boolean exists =
                categoryRepository
                        .existsByCategoryName(
                                request.getCategoryName()
                        );

        if (exists) {

            throw new ApiException(
                    "Category already exists"
            );
        }

        Category category =
                categoryMapper.toEntity(request);

        categoryRepository.save(category);

        return categoryMapper.toResponse(
                category
        );
    }

    @Override
    public List<CategoryResponse> getAll() {

        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse getById(
            Long id
    ) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        return categoryMapper.toResponse(
                category
        );
    }

    @Override
    public CategoryResponse update(
            Long id,
            CategoryRequest request
    ) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        categoryMapper.updateEntity(
                category,
                request
        );

        categoryRepository.save(category);

        return categoryMapper.toResponse(
                category
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        categoryRepository.delete(category);

        return "Category deleted successfully";
    }
}