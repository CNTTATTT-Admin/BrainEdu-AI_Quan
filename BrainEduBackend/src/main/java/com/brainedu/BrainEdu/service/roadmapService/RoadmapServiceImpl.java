package com.brainedu.BrainEdu.service.roadmapService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.RoadmapRequest.*;
import com.brainedu.BrainEdu.dto.response.RoadmapResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Roadmap;
import com.brainedu.BrainEdu.mapper.RoadmapMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.RoadmapRepository;
import com.brainedu.BrainEdu.service.roadmapService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoadmapServiceImpl
        implements RoadmapService {

    private final RoadmapRepository
            roadmapRepository;

    private final CategoryRepository
            categoryRepository;

    private final RoadmapMapper
            roadmapMapper;

    @Override
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

        roadmapRepository.save(
                roadmap
        );

        return roadmapMapper.toResponse(
                roadmap
        );
    }

    @Override
    public List<RoadmapResponse> getAll() {

        return roadmapRepository.findAll()
                .stream()
                .map(
                        roadmapMapper::toResponse
                )
                .toList();
    }

    @Override
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
    public List<RoadmapResponse> getByCategory(
            Long categoryId
    ) {

        return roadmapRepository
                .findByCategoryId(
                        categoryId
                )
                .stream()
                .map(
                        roadmapMapper::toResponse
                )
                .toList();
    }

    @Override
    public List<RoadmapResponse> getByLevel(
            String level
    ) {

        return roadmapRepository
                .findByLevel(
                        level
                )
                .stream()
                .map(
                        roadmapMapper::toResponse
                )
                .toList();
    }

    @Override
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

        roadmapRepository.save(
                roadmap
        );

        return roadmapMapper.toResponse(
                roadmap
        );
    }

    @Override
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