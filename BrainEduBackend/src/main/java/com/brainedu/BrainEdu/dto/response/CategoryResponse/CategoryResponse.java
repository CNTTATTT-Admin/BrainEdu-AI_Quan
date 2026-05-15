package com.brainedu.BrainEdu.dto.response.CategoryResponse;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long id;

    private String categoryName;

    private String description;
}