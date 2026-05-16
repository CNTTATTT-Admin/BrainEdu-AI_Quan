package com.brainedu.BrainEdu.service.instructorService;

import com.brainedu.BrainEdu.dto.request.CourseRequest.CreateCourseRequest;
import com.brainedu.BrainEdu.dto.response.CourseResponse.CourseResponse;

import java.util.List;

public interface InstructorCourseService {

    CourseResponse createCourse(
            CreateCourseRequest request
    );

    List<CourseResponse> getMyCourses();

    CourseResponse updateCourse(
            Long id,
            CreateCourseRequest request
    );

    String deleteCourse(
            Long id
    );
}