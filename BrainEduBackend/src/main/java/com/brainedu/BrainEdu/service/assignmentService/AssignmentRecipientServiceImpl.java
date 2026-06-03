package com.brainedu.BrainEdu.service.assignmentService;

import com.brainedu.BrainEdu.dto.response.AssignmentResponse.AssignmentRecipientResponse;
import com.brainedu.BrainEdu.mapper.AssignmentRecipientMapper;
import com.brainedu.BrainEdu.repository.AssignmentRecipientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentRecipientServiceImpl
        implements AssignmentRecipientService {

    private final AssignmentRecipientRepository repository;

    private final AssignmentRecipientMapper mapper;

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
}