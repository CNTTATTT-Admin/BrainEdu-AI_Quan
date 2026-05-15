package com.brainedu.BrainEdu.service.userService;
import java.util.List;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.UserMapper;
import com.brainedu.BrainEdu.repository.UserRepository;
import com.brainedu.BrainEdu.dto.request.UserRequest.*;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse createUser(UserRequest request) {

        User user = UserMapper.toEntity(request);

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }

    @Override
    public UserResponse getUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        return UserMapper.toResponse(user);
    }

    private User getCurrentUser() {

        return (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    private UserResponse map(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Override
    public UserResponse getMe() {

        return map(getCurrentUser());
    }

    @Override
    public UserResponse updateMe(
            UpdateProfileRequest request
    ) {

        User user = getCurrentUser();

        user.setName(request.getName());

        userRepository.save(user);

        return map(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public UserResponse getUserById(Long id) {

        User user = userRepository
                .findById(id)
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );

        return map(user);
    }

    @Override
    public UserResponse updateUser(
            Long id,
            UpdateUserRequest request
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow(
                        () -> new ApiException(
                                "User not found"
                        )
                );

        user.setRole(request.getRole());

        userRepository.save(user);

        return map(user);
    }

    @Override
    public String deleteUser(Long id) {

        User user = userRepository
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