package com.brainedu.BrainEdu.service.skillService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.SkillRequest.*;
import com.brainedu.BrainEdu.dto.response.SkillResponse.*;
import com.brainedu.BrainEdu.entity.Category;
import com.brainedu.BrainEdu.entity.Skill;
import com.brainedu.BrainEdu.mapper.SkillMapper;
import com.brainedu.BrainEdu.repository.CategoryRepository;
import com.brainedu.BrainEdu.repository.SkillRepository;
import com.brainedu.BrainEdu.service.skillService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl
        implements SkillService {

    private final SkillRepository
            skillRepository;

    private final CategoryRepository
            categoryRepository;

    private final SkillMapper
            skillMapper;

    @Override
    public SkillResponse create(
            SkillRequest request
    ) {

        Category category =
                categoryRepository
                        .findById(
                                request.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        Skill skill =
                Skill.builder()

                        .category(category)

                        .skillName(
                                request.getSkillName()
                        )

                        .description(
                                request.getDescription()
                        )

                        .build();

        skillRepository.save(skill);

        return skillMapper.toResponse(
                skill
        );
    }

    @Override
//     @Cacheable(
//             value = "skills"
//     )
    public Page<SkillResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return skillRepository.findAll(pageable)
                .map(
                        skillMapper::toResponse
                );
    }

    @Override
    public Page<SkillResponse> getByCategory(
            Long categoryId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return skillRepository
                .findByCategoryId(
                        categoryId,
                        pageable
                )
                .map(
                        skillMapper::toResponse
                );
    }

    @Override
    public SkillResponse getById(
            Long id
    ) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Skill not found"
                                )
                        );

        return skillMapper.toResponse(
                skill
        );
    }

    @Override
    public SkillResponse update(
            Long id,
            SkillRequest request
    ) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Skill not found"
                                )
                        );

        Category category =
                categoryRepository
                        .findById(
                                request.getCategoryId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Category not found"
                                )
                        );

        skill.setCategory(category);

        skill.setSkillName(
                request.getSkillName()
        );

        skill.setDescription(
                request.getDescription()
        );

        skillRepository.save(skill);

        return skillMapper.toResponse(
                skill
        );
    }

    @Override
    public String delete(
            Long id
    ) {

        Skill skill =
                skillRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Skill not found"
                                )
                        );

        skillRepository.delete(skill);

        return "Skill deleted successfully";
    }
}