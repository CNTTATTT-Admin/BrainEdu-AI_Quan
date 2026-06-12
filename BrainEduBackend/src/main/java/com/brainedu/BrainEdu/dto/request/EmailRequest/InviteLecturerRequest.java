package com.brainedu.BrainEdu.dto.request.EmailRequest;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InviteLecturerRequest {
    private String email;
    private String lecturerName;
    private String courseTitle;
}