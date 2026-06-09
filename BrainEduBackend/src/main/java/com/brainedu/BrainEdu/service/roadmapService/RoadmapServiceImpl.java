package com.brainedu.BrainEdu.service.roadmapService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.constant.CacheNames;
import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.PagedResponse;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.Roadmap;
import com.brainedu.BrainEdu.entity.RoadmapCourse;
import com.brainedu.BrainEdu.mapper.RoadmapMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.RoadmapRepository;
import com.brainedu.BrainEdu.service.roadmapService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RoadmapServiceImpl
        implements RoadmapService {

    private final RoadmapRepository
            roadmapRepository;

    private final CategoryRepository
            categoryRepository;
    private final CourseRepository
                courseRepository;

    private final RoadmapMapper
            roadmapMapper;

    @Override
    @CacheEvict(
            value = CacheNames.ROADMAPS,
            allEntries = true
    )
    public RoadmapResponse create(
            RoadmapRequest request
    ) {

        Category category =
                categoryRepository.findById(
                                request.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        Roadmap roadmap =
                Roadmap.builder()

                        .category(category)

                        .roadmapName(
                                request.getRoadmapName()
                        )

                        .level(
                                request.getLevel()
                        )

                        .description(
                                request.getDescription()
                        )

                        .build();

        Roadmap savedRoadmap =
                roadmapRepository.save(
                        roadmap
                );

        return roadmapMapper.toResponse(
                savedRoadmap
        );
    }

    @Override
        public Page<RoadmapResponse> getAll(int page, int size, Long categoryId) {

        Pageable pageable = PageRequest.of(page, size);

        return roadmapRepository
                .findAllByCategoryId(categoryId, pageable)
                .map(roadmapMapper::toResponse);
        }

        @Override
        @Transactional(readOnly = true)
        @Cacheable(
                value = CacheNames.ROADMAPS,
                key = "'id:' + #id",
                sync = true
        )
        public RoadmapDetailResponse getById(
                Long id
        ) {

    Roadmap roadmap =
            roadmapRepository
                    .findDetailById(id)
                    .orElseThrow(
                            () -> new ApiException(
                                    "Roadmap not found"
                            )
                    );

        List<RoadmapDetailResponse.CourseItem>
        courses =

        roadmap.getRoadmapCourses()
                .stream()

                .map((RoadmapCourse roadmapCourse) -> {

                    Course course =
                            roadmapCourse.getCourse();

                    return RoadmapDetailResponse
                            .CourseItem
                            .builder()

                            .id(course.getId())

                            .title(course.getTitle())

                            .description(
                                    course.getDescription()
                            )

                            .build();
                })

                .toList();


    return RoadmapDetailResponse
            .builder()

            .id(
                    roadmap.getId()
            )

            .roadmapName(
                    roadmap.getRoadmapName()
            )

            .level(
                    roadmap.getLevel()
            )

            .description(
                    roadmap.getDescription()
            )

            .categoryId(
                    roadmap.getCategory()
                            .getId()
            )

            .categoryName(
                    roadmap.getCategory()
                            .getCategoryName()
            )

            .totalCourses(
                    courses.size()
            )

            .courses(
                    courses
            )

            .build();
}



    @Override
    @Transactional(readOnly = true)
    @Cacheable(
            value = CacheNames.ROADMAPS,
            key = "'category:' + #categoryId + ':' + #page + ':' + #size",
            sync = true
    )
    public PagedResponse<RoadmapResponse> getByCategory(
            Long categoryId,
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(page, size);

        Page<RoadmapResponse> result =
                roadmapRepository
                        .findByCategoryId(categoryId, pageable)
                        .map(roadmapMapper::toResponse);

        return new PagedResponse<>(
                result.getContent(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(
            value = CacheNames.ROADMAPS,
            key = "'level:' + #level + ':' + #page + ':' + #size",
            sync = true
    )
    public Page<RoadmapResponse> getByLevel(
            String level,
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        return roadmapRepository
                .findByLevel(
                        level,
                        pageable
                )
                .map(
                        roadmapMapper::toResponse
                );
    }

        @Override
        @CacheEvict(
                value = CacheNames.ROADMAPS,
                allEntries = true
        )
        public RoadmapDetailResponse addCourse(

                Long roadmapId,

                AddRoadmapCourseRequest request
        ) {

        Roadmap roadmap =
                roadmapRepository
                        .findDetailById(
                                roadmapId
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Roadmap not found"
                                )
                        );

        Course course =
                courseRepository
                        .findById(
                                request.getCourseId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        boolean exists =
                roadmap.getRoadmapCourses()
                        .stream()
                        .anyMatch(rc ->

                                rc.getCourse()
                                        .getId()
                                        .equals(
                                                request.getCourseId()
                                        )
                        );

        if (exists) {

                throw new ApiException(
                        "Course already exists in roadmap"
                );
        }

        RoadmapCourse roadmapCourse =
                RoadmapCourse
                        .builder()

                        .roadmap(
                                roadmap
                        )

                        .course(
                                course
                        )

                        .orderIndex(
                                request.getOrderIndex()
                        )

                        .requiredCourse(
                                request.getRequiredCourse()
                        )

                        .estimatedWeek(
                                request.getEstimatedWeek()
                        )

                        .build();

        roadmap.getRoadmapCourses()
                .add(
                        roadmapCourse
                );

        Roadmap savedRoadmap =
                roadmapRepository.save(
                        roadmap
                );

        return roadmapMapper
                .toDetailResponse(
                        savedRoadmap
                );
        }


    @Override
    @Caching(
            put = {
                    @CachePut(
                            value = CacheNames.ROADMAPS,
                            key = "'id:' + #id"
                    )
            },
            evict = {
                    @CacheEvict(
                            value = CacheNames.ROADMAPS,
                            allEntries = true
                    )
            }
    )
    public RoadmapResponse update(
            Long id,
            RoadmapRequest request
    ) {

        Roadmap roadmap =
                roadmapRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Roadmap not found"
                                )
                        );

        Category category =
                categoryRepository.findById(
                                request.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        roadmap.setCategory(
                category
        );

        roadmap.setRoadmapName(
                request.getRoadmapName()
        );

        roadmap.setLevel(
                request.getLevel()
        );

        roadmap.setDescription(
                request.getDescription()
        );

        Roadmap updatedRoadmap =
                roadmapRepository.save(
                        roadmap
                );

        return roadmapMapper.toResponse(
                updatedRoadmap
        );
    }

    @Override
    @CacheEvict(
            value = CacheNames.ROADMAPS,
            allEntries = true
    )
    public String delete(
            Long id
    ) {

        Roadmap roadmap =
                roadmapRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Roadmap not found"
                                )
                        );

        roadmapRepository.delete(
                roadmap
        );

        return "Roadmap deleted successfully";
    }
}