package com.brainedu.BrainEdu.service.userService;
import java.util.List;
import com.brainedu.BrainEdu.dto.request.UserRequest;
import com.brainedu.BrainEdu.dto.response.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();
    UserResponse createUser(UserRequest request);
    UserResponse getUser(Long id);
}