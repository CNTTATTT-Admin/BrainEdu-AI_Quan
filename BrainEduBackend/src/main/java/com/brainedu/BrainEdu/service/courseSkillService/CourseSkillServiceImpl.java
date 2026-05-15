package com.brainedu.BrainEdu.service.courseSkillService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.CourseSkillRequest.*;
import com.brainedu.BrainEdu.dto.response.CourseSkillResponse.*;
import com.brainedu.BrainEdu.entity.Course;
import com.brainedu.BrainEdu.entity.CourseSkill;
import com.brainedu.BrainEdu.entity.Skill;
import com.brainedu.BrainEdu.mapper.CourseSkillMapper;
import com.brainedu.BrainEdu.repository.CourseRepository;
import com.brainedu.BrainEdu.repository.CourseSkillRepository;
import com.brainedu.BrainEdu.repository.SkillRepository;
import com.brainedu.BrainEdu.service.courseSkillService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseSkillServiceImpl
        implements CourseSkillService {

    private final CourseSkillRepository
            courseSkillRepository;

    private final CourseRepository
            courseRepository;

    private final SkillRepository
            skillRepository;

    private final CourseSkillMapper
            courseSkillMapper;

    @Override
    public CourseSkillResponse addSkill(
            CourseSkillRequest request
    ) {

        Course course =
                courseRepository.findById(
                                request.getCourseId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course not found"
                                )
                        );

        Skill skill =
                skillRepository.findById(
                                request.getSkillId()
                        )
                        .orElseThrow(
                                () -> new ApiException(
                                        "Skill not found"
                                )
                        );

        boolean exists =
                courseSkillRepository
                        .findByCourseIdAndSkillId(
                                course.getId(),
                                skill.getId()
                        )
                        .isPresent();

        if (exists) {

            throw new ApiException(
                    "Skill already added to course"
            );
        }

        CourseSkill courseSkill =
                CourseSkill.builder()

                        .course(course)

                        .skill(skill)

                        .build();

        courseSkillRepository.save(
                courseSkill
        );

        return courseSkillMapper
                .toResponse(courseSkill);
    }

    @Override
    public List<CourseSkillResponse>
    getByCourse(
            Long courseId
    ) {

        return courseSkillRepository
                .findByCourseId(courseId)
                .stream()
                .map(
                        courseSkillMapper
                                ::toResponse
                )
                .toList();
    }

    @Override
    public List<CourseSkillResponse>
    getBySkill(
            Long skillId
    ) {

        return courseSkillRepository
                .findBySkillId(skillId)
                .stream()
                .map(
                        courseSkillMapper
                                ::toResponse
                )
                .toList();
    }

    @Override
    public String remove(
            Long id
    ) {

        CourseSkill courseSkill =
                courseSkillRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Course skill not found"
                                )
                        );

        courseSkillRepository.delete(
                courseSkill
        );

        return "Course skill removed";
    }
}