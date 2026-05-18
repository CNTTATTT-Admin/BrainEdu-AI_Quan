package com.brainedu.BrainEdu.dto.request.CategoryRequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryRequest {

    @NotBlank
    @Size(max = 100)
    private String categoryName;

    @NotBlank
    private String description;
}