package com.brainedu.BrainEdu.service.lessonService;

import com.brainedu.BrainEdu.dto.request.LessonRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonResponse.*;

import java.util.List;

public interface LessonService {

    LessonResponse create(
            LessonRequest request
    );

    List<LessonResponse> getByCourse(
            Long courseId
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