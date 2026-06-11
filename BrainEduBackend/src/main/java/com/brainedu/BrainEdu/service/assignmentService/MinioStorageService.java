package com.brainedu.BrainEdu.service.assignmentService;

import io.minio.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

@Service
public class MinioStorageService {

    private final MinioClient minioClient;
    
    @Value("${minio.bucket-name}")
    private String bucketName;

    public MinioStorageService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public String uploadFile(MultipartFile file) {
        try {
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build());
            
            return "http://localhost:9000/" + bucketName + "/" + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Lỗi upload file lên MinIO: " + e.getMessage());
        }
    }
}