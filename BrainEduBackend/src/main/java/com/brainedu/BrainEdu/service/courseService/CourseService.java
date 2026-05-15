package com.brainedu.BrainEdu.service.courseService;

import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;

import java.util.List;

public interface CourseService {

    CourseResponse create(
            CourseRequest request
    );

    List<CourseResponse> getAll();

    List<CourseResponse> getByCategory(
            Long categoryId
    );

    CourseResponse getById(
            Long id
    );

    CourseResponse update(
            Long id,
            CourseRequest request
    );

    String delete(
            Long id
    );
}