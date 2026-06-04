package com.brainedu.BrainEdu.service.assignmentService;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String uploadFile(MultipartFile file);
}