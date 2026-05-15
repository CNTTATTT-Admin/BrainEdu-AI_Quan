package com.brainedu.BrainEdu.service.skillService;

import com.brainedu.BrainEdu.dto.request.SkillRequest.*;
import com.brainedu.BrainEdu.dto.response.SkillResponse.*;

import java.util.List;

public interface SkillService {

    SkillResponse create(
            SkillRequest request
    );

    List<SkillResponse> getAll();

    List<SkillResponse> getByCategory(
            Long categoryId
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