package com.brainedu.BrainEdu.service.userLearningPathService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.UserLearningPathRequest.*;
import com.brainedu.BrainEdu.dto.response.UserLearningPathResponse.*;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Roadmap;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.entity.UserLearningPath;
import com.brainedu.BrainEdu.mapper.UserLearningPathMapper;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.RoadmapRepository;
import com.brainedu.BrainEdu.repository.UserLearningPathRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.userLearningPathService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserLearningPathServiceImpl
        implements UserLearningPathService {

    private final UserLearningPathRepository
            learningPathRepository;

    private final UserRepository
            userRepository;

    private final CourseRepository
            courseRepository;

    private final RoadmapRepository
            roadmapRepository;

    private final UserLearningPathMapper
            learningPathMapper;

    @Override
    public UserLearningPathResponse create(
            UserLearningPathRequest request
    ) {

        User user =
                userRepository.findById(
                                request.getUserId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        Course course =
                courseRepository.findById(
                                request.getCourseId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        Roadmap roadmap =
                roadmapRepository.findById(
                                request.getRoadmapId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Roadmap not found"
                                )
                        );

        UserLearningPath learningPath =
                UserLearningPath.builder()

                        .user(user)

                        .course(course)

                        .roadmap(roadmap)

                        .recommendationScore(
                                request.getRecommendationScore()
                        )

                        .status(
                                request.getStatus()
                        )

                        .recommendedReason(
                                request.getRecommendedReason()
                        )

                        .aiGenerated(
                                request.getAiGenerated()
                        )

                        .createdAt(
                                LocalDateTime.now()
                        )

                        .build();

        learningPathRepository.save(
                learningPath
        );

        return learningPathMapper.toResponse(
                learningPath
        );
    }

    @Override
    public Page<UserLearningPathResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return learningPathRepository.findAll(pageable)
                .map(
                        learningPathMapper::toResponse
                );
    }

    @Override
    public UserLearningPathResponse getById(
            Long id
    ) {

        UserLearningPath learningPath =
                learningPathRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Learning path not found"
                                )
                        );

        return learningPathMapper.toResponse(
                learningPath
        );
    }

    @Override
    public Page<UserLearningPathResponse> getByUser(
            Long userId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return learningPathRepository
                .findByUserId(
                        userId,
                        pageable
                )
                .map(
                        learningPathMapper::toResponse
                );
    }

    @Override
    public Page<UserLearningPathResponse> getByRoadmap(
            Long roadmapId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return learningPathRepository
                .findByRoadmapId(
                        roadmapId,
                        pageable
                )
                .map(
                        learningPathMapper::toResponse
                );
    }

    @Override
    public Page<UserLearningPathResponse> getByCourse(
            Long courseId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return learningPathRepository
                .findByCourseId(
                        courseId,
                        pageable
                )
                .map(
                        learningPathMapper::toResponse
                );
    }

    @Override
    public UserLearningPathResponse update(
            Long id,
            UserLearningPathRequest request
    ) {

        UserLearningPath learningPath =
                learningPathRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Learning path not found"
                                )
                        );

        User user =
                userRepository.findById(
                                request.getUserId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        Course course =
                courseRepository.findById(
                                request.getCourseId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        Roadmap roadmap =
                roadmapRepository.findById(
                                request.getRoadmapId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Roadmap not found"
                                )
                        );

        learningPath.setUser(user);

        learningPath.setCourse(course);

        learningPath.setRoadmap(roadmap);

        learningPath.setRecommendationScore(
                request.getRecommendationScore()
        );

        learningPath.setStatus(
                request.getStatus()
        );

        learningPath.setRecommendedReason(
                request.getRecommendedReason()
        );

        learningPath.setAiGenerated(
                request.getAiGenerated()
        );

        learningPathRepository.save(
                learningPath
        );

        return learningPathMapper.toResponse(
                learningPath
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        UserLearningPath learningPath =
                learningPathRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Learning path not found"
                                )
                        );

        learningPathRepository.delete(
                learningPath
        );

        return "Learning path deleted successfully";
    }
}