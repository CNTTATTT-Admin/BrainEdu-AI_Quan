package com.brainedu.BrainEdu.dto.request.FilterRequest;

import lombok.Data;

@Data
public class CourseFilterRequest {

    private Integer page = 0;
    private Integer size = 10;

    private Long categoryId;

    private String keyword;

    private String level; 

    private Float minPrice;
    private Float maxPrice;

    private Integer minDuration;
    private Integer maxDuration;

    private String sortBy = "createdAt"; 
    private String sortDirection = "desc"; 
}