package com.brainedu.BrainEdu.service.mailService;

import com.brainedu.BrainEdu.dto.request.EmailRequest.InviteLecturerRequest;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.SendOtp;
import com.brainedu.BrainEdu.dto.request.EmailRequest.OtpRequest.VerifyOtp;

public interface OtpService {

    void sendRegisterOtp(
            SendOtp request
    );

    void verifyRegisterOtp(
            VerifyOtp request
    );
    void sendInvitationEmail(
            InviteLecturerRequest request
    );
}