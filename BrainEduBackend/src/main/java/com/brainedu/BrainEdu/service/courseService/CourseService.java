package com.brainedu.BrainEdu.service.courseService;

import com.brainedu.BrainEdu.dto.request.CourseRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CourseService {

    CourseResponse create(
            CourseRequest request
    );

    Page<CourseResponse> getAll(int page, int size);

    Page<CourseResponse> getByCategory(
            Long categoryId,
            int page,
            int size
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