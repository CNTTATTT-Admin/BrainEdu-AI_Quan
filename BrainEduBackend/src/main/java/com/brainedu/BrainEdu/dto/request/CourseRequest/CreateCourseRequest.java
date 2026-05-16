package com.brainedu.BrainEdu.dto.request.CourseRequest;

import lombok.Data;

@Data
public class CreateCourseRequest {

    private String title;

    private String description;

    private Long categoryId;

    private Float price;
}