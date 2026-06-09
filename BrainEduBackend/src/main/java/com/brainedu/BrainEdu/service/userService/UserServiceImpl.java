package com.brainedu.BrainEdu.service.userService;

import com.brainedu.BrainEdu.common.enums.UserStatus;
import com.brainedu.BrainEdu.config.ApiException;
import com.brainedu.BrainEdu.constant.CacheNames;
import com.brainedu.BrainEdu.dto.request.UserRequest.TopStudentRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateProfileRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateUserRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.PagedResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.InstructorResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.TopInstructorResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.TopStudentResponse;
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

        @Override
        // @Cacheable(
        //         value = CacheNames.USERS,
        //         key = "'instructors:' + #page + ':' + #size"
        // )
        public PagedResponse<InstructorResponse> getAllInstructors(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<InstructorResponse> instructorPage =
                userRepository.findAllInstructors(
                        pageable
                );

        return new PagedResponse<>(
                instructorPage.getContent(),
                instructorPage.getNumber(),
                instructorPage.getSize(),
                instructorPage.getTotalElements(),
                instructorPage.getTotalPages()
        );
        }
//     @CacheEvict(
//             value = CacheNames.USERS,
//             allEntries = true
//     )
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

        if (request.getRole() == null || request.getRole().trim().isEmpty()) {
                user.setRole("USER");
        } else {
                user.setRole(request.getRole().trim().toUpperCase());
        }

        User savedUser =
                userRepository.save(user);

        return userMapper.toResponse(
                savedUser
        );
    }
        @Override
                public UserResponse banUser(Long id) {
                User user = userRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

                user.setStatus(UserStatus.BANNED);
                
                User updatedUser = userRepository.save(user);
                return userMapper.toResponse(updatedUser);
        }

        @Override
        public UserResponse activeUser(Long id) {
                User user = userRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

                user.setStatus(UserStatus.ACTIVE);
                
                User updatedUser = userRepository.save(user);
                return userMapper.toResponse(updatedUser);
        }

        @Override
        public UserResponse updateUserByAdmin(Long id, UpdateProfileRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
                user.setName(request.getName().trim());
        }

        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
                user.setEmail(request.getEmail().trim());
        }
        
        if (request.getRole() != null && !request.getRole().trim().isEmpty()) {
                user.setRole(request.getRole().trim().toUpperCase());
        }

        User updatedUser = userRepository.save(user);

        return userMapper.toResponse(updatedUser);
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
    @Override
    public Page<TopStudentResponse> getTopStudents(TopStudentRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Object[]> rawResults = userRepository.findTopStudentsOverview(pageable);

        return rawResults.map(row -> TopStudentResponse.builder()
                        .studentId(((Number) row[0]).longValue())
                        .studentName((String) row[1])
                        .studentAvatar((String) row[2])
                        .averageCompletionPercent(((Number) row[3]).doubleValue())
                        .averageAssignmentScore(((Number) row[4]).doubleValue())
                        .averageQuizScore(((Number) row[5]).doubleValue())
                        .completedCourses(((Number) row[6]).longValue())
                        .totalLearningTime(((Number) row[7]).longValue())
                        .completedLessons(((Number) row[8]).longValue())
                        .enrolledCourses(((Number) row[9]).longValue())
                        .totalQuizzesTaken(((Number) row[10]).longValue())
                        .overallPerformanceScore(((Number) row[11]).doubleValue())
                        .build());
    }

    @Override
    public Page<TopInstructorResponse> getTopInstructors(TopStudentRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Object[]> rawResults = userRepository.findTopInstructorsOverview(pageable);

        return rawResults.map(row -> TopInstructorResponse.builder()
                .instructorId(row[0] != null ? ((Number) row[0]).longValue() : null)
                .instructorName(row[1] != null ? row[1].toString() : null)
                .instructorAvatar(row[2] != null ? row[2].toString() : null)
                .totalCourses(row[3] != null ? ((Number) row[3]).longValue() : 0L)
                .totalStudentsEnrolled(row[4] != null ? ((Number) row[4]).longValue() : 0L)
                .build());
    }
}