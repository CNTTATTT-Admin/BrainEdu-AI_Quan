package com.brainedu.BrainEdu.service.userService;
import java.util.List;

import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateProfileRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UpdateUserRequest;
import com.brainedu.BrainEdu.dto.request.UserRequest.UserRequest;
import com.brainedu.BrainEdu.dto.response.PagedResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.InstructorResponse;
import com.brainedu.BrainEdu.dto.response.UserResponse.UserResponse;
import org.springframework.data.domain.Page;

public interface UserService {

    PagedResponse<UserResponse> getAllUsers(int page, int size);
    UserResponse createUser(UserRequest request);
    UserResponse getMe();

    UserResponse updateMe(
            UpdateProfileRequest request
    );

    UserResponse getUserById(Long id);

    PagedResponse<UserResponse> getAllUsersExceptAdmin(int page, int size);
    PagedResponse<InstructorResponse> getAllInstructors(int page, int size);

    String deleteUser(Long id);
    UserResponse banUser(Long id);
    UserResponse activeUser(Long id);
    UserResponse updateUserByAdmin(Long id, UpdateProfileRequest request);
}