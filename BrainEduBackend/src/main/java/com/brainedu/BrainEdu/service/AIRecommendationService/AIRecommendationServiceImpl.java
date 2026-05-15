package com.brainedu.BrainEdu.service.AIRecommendationService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.*;
import com.brainedu.BrainEdu.dto.response.AIRecommendationResponse.*;
import com.brainedu.BrainEdu.entity.AIRecommendation;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.AIRecommendationMapper;
import com.brainedu.BrainEdu.repository.AIRecommendationRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.service.AIRecommendationService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIRecommendationServiceImpl
        implements AIRecommendationService {

    private final AIRecommendationRepository
            recommendationRepository;

    private final UserRepository
            userRepository;

    private final AIRecommendationMapper
            recommendationMapper;

    @Override
    public AIRecommendationResponse create(
            AIRecommendationRequest request
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

        AIRecommendation recommendation =
                AIRecommendation.builder()

                        .user(user)

                        .recommendationType(
                                request.getRecommendationType()
                        )

                        .targetId(
                                request.getTargetId()
                        )

                        .score(
                                request.getScore()
                        )

                        .reason(
                                request.getReason()
                        )

                        .createdAt(
                                LocalDateTime.now()
                        )

                        .build();

        recommendationRepository.save(
                recommendation
        );

        return recommendationMapper.toResponse(
                recommendation
        );
    }

    @Override
    public List<AIRecommendationResponse> getAll() {

        return recommendationRepository.findAll()
                .stream()
                .map(
                        recommendationMapper::toResponse
                )
                .toList();
    }

    @Override
    public AIRecommendationResponse getById(
            Long id
    ) {

        AIRecommendation recommendation =
                recommendationRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Recommendation not found"
                                )
                        );

        return recommendationMapper.toResponse(
                recommendation
        );
    }

    @Override
    public List<AIRecommendationResponse> getByUser(
            Long userId
    ) {

        return recommendationRepository
                .findByUserId(
                        userId
                )
                .stream()
                .map(
                        recommendationMapper::toResponse
                )
                .toList();
    }

    @Override
    public List<AIRecommendationResponse> getByType(
            String type
    ) {

        return recommendationRepository
                .findByRecommendationType(
                        type
                )
                .stream()
                .map(
                        recommendationMapper::toResponse
                )
                .toList();
    }

    @Override
    public String delete(
            Long id
    ) {

        AIRecommendation recommendation =
                recommendationRepository.findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "Recommendation not found"
                                )
                        );

        recommendationRepository.delete(
                recommendation
        );

        return "Recommendation deleted successfully";
    }
}