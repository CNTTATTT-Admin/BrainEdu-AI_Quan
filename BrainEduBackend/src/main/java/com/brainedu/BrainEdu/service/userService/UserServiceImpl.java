package com.brainedu.BrainEdu.service.userService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateProfileRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateUserRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.UserMapper;
import com.brainedu.BrainEdu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl
        implements UserService {

    private final UserRepository
            userRepository;

    private final PasswordEncoder
            passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public Page<UserResponse> getAllUsers(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );

        return userRepository
                .findAll(pageable)
                .map(userMapper::toResponse);
    }

    @Override
    public UserResponse createUser(
            UserRequest request
    ) {

        User user =
                userMapper.toEntity(request);

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        if (user.getRole() == null) {

            user.setRole("USER");
        }

        User savedUser =
                userRepository.save(user);

        return userMapper.toResponse(
                savedUser
        );
    }

    @Override
    public UserResponse getUser(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        return userMapper.toResponse(
                user
        );
    }

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
    public UserResponse getMe() {

        User user =
                getCurrentUser();

        return userMapper.toResponse(
                user
        );
    }

    @Override
    public UserResponse updateMe(
            UpdateProfileRequest request
    ) {

        User user =
                getCurrentUser();

        user.setName(
                request.getName()
        );

        User updatedUser =
                userRepository.save(user);

        return userMapper.toResponse(
                updatedUser
        );
    }

    @Override
    public UserResponse getUserById(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        return userMapper.toResponse(
                user
        );
    }

    @Override
    public UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        user.setRole(
                request.getRole()
        );

        User updatedUser =
                userRepository.save(user);

        return userMapper.toResponse(
                updatedUser
        );
    }

    @Override
    public String deleteUser(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new ApiException(
                                        "User not found"
                                )
                        );

        userRepository.delete(user);

        return "User deleted successfully";
    }
}