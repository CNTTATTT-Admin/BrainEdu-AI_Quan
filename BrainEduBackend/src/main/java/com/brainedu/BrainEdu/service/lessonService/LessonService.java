package com.brainedu.BrainEdu.service.lessonService;

import com.brainedu.BrainEdu.dto.request.LessonRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LessonService {

    LessonResponse create(
            LessonRequest request
    );

    Page<LessonResponse> getByCourse(
            Long courseId,
            int page,
            int size
    );

    LessonResponse getById(
            Long id
    );

    LessonResponse update(
            Long id,
            LessonRequest request
    );

    String delete(
            Long id
    );
}