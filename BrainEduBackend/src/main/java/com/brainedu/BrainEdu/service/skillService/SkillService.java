package com.brainedu.BrainEdu.service.skillService;

import com.brainedu.BrainEdu.dto.request.SkillRequest.*;
import com.brainedu.BrainEdu.dto.response.SkillResponse.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SkillService {

    SkillResponse create(
            SkillRequest request
    );

    Page<SkillResponse> getAll(int page, int size);

    Page<SkillResponse> getByCategory(
            Long categoryId,
            int page,
            int size
    );

    SkillResponse getById(
            Long id
    );

    SkillResponse update(
            Long id,
            SkillRequest request
    );

    String delete(
            Long id
    );
}