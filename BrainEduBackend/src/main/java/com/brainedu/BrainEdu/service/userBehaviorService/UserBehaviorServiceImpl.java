package com.brainedu.BrainEdu.service.userBehaviorService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.UserBehaviorRequest.UserBehaviorRequest;
import com.brainedu.BrainEdu.dto.response.UserBehaviorResponse.UserBehaviorResponse;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.entity.UserBehavior;
import com.brainedu.BrainEdu.mapper.UserBehaviorMapper;
import com.brainedu.BrainEdu.repository.UserBehaviorRepository;
import com.brainedu.BrainEdu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class UserBehaviorServiceImpl
        implements UserBehaviorService {

    private final UserRepository
            userRepository;

    private final UserBehaviorRepository
            trackingRepository;

    private final UserBehaviorMapper
            trackingMapper;

    private User getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );
    }

    @Override
    public UserBehaviorResponse trackBehavior(
            UserBehaviorRequest request
    ) {

        User user =
                getCurrentUser();

        UserBehavior tracking =
                trackingMapper.toEntity(
                        request
                );

        tracking.setUser(user);

        tracking.setCreatedAt(
                LocalDateTime.now()
        );

        UserBehavior saved =
                trackingRepository.save(
                        tracking
                );

        return trackingMapper
                .toResponse(saved);
    }
}