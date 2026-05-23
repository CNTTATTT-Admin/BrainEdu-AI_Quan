package com.brainedu.BrainEdu.service.roadmapService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.constant.CacheNames;
import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Roadmap;
import com.brainedu.BrainEdu.mapper.RoadmapMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
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
//    @Transactional(readOnly = true)
//    @Cacheable(
//            value = CacheNames.ROADMAPS,
//            key = "'all:' + #page + ':' + #size",
//            sync = true
//    )
    public Page<RoadmapResponse> getAll(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        return roadmapRepository
                .findAll(pageable)
                .map(
                        roadmapMapper::toResponse
                );
    }

    @Override
//     @Transactional(readOnly = true)
//     @Cacheable(
//             value = CacheNames.ROADMAPS,
//             key = "'id:' + #id",
//             sync = true
//     )
    public RoadmapResponse getById(
            Long id
    ) {

        Roadmap roadmap =
                roadmapRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Roadmap not found"
                                )
                        );

        return roadmapMapper.toResponse(
                roadmap
        );
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(
            value = CacheNames.ROADMAPS,
            key = "'category:' + #categoryId + ':' + #page + ':' + #size",
            sync = true
    )
    public Page<RoadmapResponse> getByCategory(
            Long categoryId,
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        return roadmapRepository
                .findByCategoryId(
                        categoryId,
                        pageable
                )
                .map(
                        roadmapMapper::toResponse
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