package com.brainedu.BrainEdu.service.lessonProgressService;

import com.brainedu.BrainEdu.dto.request.LessonProgressRequest.*;
import com.brainedu.BrainEdu.dto.response.LessonProgressResponse.*;

import java.util.List;

public interface LessonProgressService {

    LessonProgressResponse saveProgress(
            LessonProgressRequest request
    );

    List<LessonProgressResponse> myProgress();

    LessonProgressResponse getByLesson(
            Long lessonId
    );
}