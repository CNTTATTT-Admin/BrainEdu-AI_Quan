package com.brainedu.BrainEdu.service.assignmentService;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final String uploadDir = "uploads/";

    @Override
    public String uploadFile(MultipartFile file) {

        try {
            String fileName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path =
                    Paths.get(uploadDir + fileName);

            Files.createDirectories(path.getParent());

            Files.write(path, file.getBytes());

            return "http://localhost:8080/files/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("Upload failed");
        }
    }
}