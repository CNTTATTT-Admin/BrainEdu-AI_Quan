package com.brainedu.BrainEdu.service.userService;

import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.constant.CacheNames;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateProfileRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateUserRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.PagedResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.UserMapper;
import com.brainedu.BrainEdu.repository.UserRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Caching;
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
        // @Cacheable(
        //         value = CacheNames.USERS,
        //         key = "'all:' + #page + ':' + #size"
        // )
        public PagedResponse<UserResponse> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<UserResponse> userPage = userRepository
                .findAll(pageable)
                .map(userMapper::toResponse);

        return new PagedResponse<>(
                userPage.getContent(),
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages()
        );
        }

        @Override
        // @Cacheable(
        //         value = CacheNames.USERS,
        //         key = "'except-admin:' + #page + ':' + #size"
        // )
        public PagedResponse<UserResponse> getAllUsersExceptAdmin(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<UserResponse> userPage = userRepository
                .findAllExceptAdmin(pageable)
                .map(userMapper::toResponse);

        return new PagedResponse<>(
                userPage.getContent(),
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages()
        );
        }
    @CacheEvict(
            value = CacheNames.USERS,
            allEntries = true
    )
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

    @Caching(
            put = {
                    @CachePut(
                            value = CacheNames.USERS,
                            key = "'id:' + #result.id"
                    )
            },
            evict = {
                    @CacheEvict(
                            value = CacheNames.USERS,
                            allEntries = true
                    )
            }
    )
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

    @Cacheable(
            value = CacheNames.USERS,
            key = "'all:' + #page + ':' + #size"
    )
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

    @Caching(
            put = {
                    @CachePut(
                            value = CacheNames.USERS,
                            key = "'id:' + #id"
                    )
            },
            evict = {
                    @CacheEvict(
                            value = CacheNames.USERS,
                            allEntries = true
                    )
            }
    )
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

    @CacheEvict(
            value = CacheNames.USERS,
            allEntries = true
    )
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