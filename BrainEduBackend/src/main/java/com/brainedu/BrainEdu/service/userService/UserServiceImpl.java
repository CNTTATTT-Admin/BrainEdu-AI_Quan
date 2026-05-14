package com.brainedu.BrainEdu.service.userService;
import java.util.List;

import com.brainedu.BrainEdu.dto.request.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.UserMapper;
import com.brainedu.BrainEdu.repository.UserRepository;

import lombok.RequiredArgsConstructor;

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
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .toList();
    }
    @Override
    public UserResponse getUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        return UserMapper.toResponse(user);
    }

}