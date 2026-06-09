package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.dto.request.AssignmentRequest.AssignMoreStudentsRequest;
import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentRecipientResponse;
import com.brainedu.BrainEdu.entity.Assignment;
import com.brainedu.BrainEdu.entity.AssignmentRecipient;
import com.brainedu.BrainEdu.entity.User;
import com.brainedu.BrainEdu.mapper.AssignmentRecipientMapper;
import com.brainedu.BrainEdu.repository.AssignmentRecipientRepository;
import com.brainedu.BrainEdu.repository.AssignmentRepository;
import com.brainedu.BrainEdu.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentRecipientServiceImpl
        implements AssignmentRecipientService {

    private final AssignmentRecipientRepository repository;

    private final AssignmentRecipientMapper mapper;
    private final AssignmentRepository assignmentRepository;
    private final UserRepository userRepository;
    @Override
    public List<AssignmentRecipientResponse>
    getStudents(
            Long assignmentId
    ) {

        return repository
                .findByAssignmentId(
                        assignmentId
                )
                .stream()
                .map(
                        mapper::toResponse
                )
                .toList();
    }
    @Override
        @Transactional
        public void assignMoreStudents(AssignMoreStudentsRequest request) {
        Assignment assignment = assignmentRepository.findById(request.getAssignmentId())
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        request.getStudentIds().forEach(studentId -> {
                boolean alreadyAssigned = repository.existsByAssignmentIdAndStudentId(
                        request.getAssignmentId(), 
                        studentId
                );

                if (!alreadyAssigned) {
                User student = userRepository.findById(studentId)
                        .orElseThrow(() -> new RuntimeException("Student not found: " + studentId));

                AssignmentRecipient recipient = new AssignmentRecipient();
                recipient.setAssignment(assignment);
                recipient.setStudent(student);
                
                repository.save(recipient);
                }
        });
        }
}