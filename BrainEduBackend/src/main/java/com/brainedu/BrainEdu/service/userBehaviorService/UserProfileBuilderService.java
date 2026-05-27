package com.brainedu.BrainEdu.service.userBehaviorService;

import com.brainedu.BrainEdu.dto.request.AIRecommendationRequest.AIRecommendationRequest;
import com.brainedu.BrainEdu.entity.UserBehavior;
import com.brainedu.BrainEdu.repository.UserBehaviorRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserProfileBuilderService {

    private final UserBehaviorRepository
            userBehaviorRepository;

    public AIRecommendationRequest buildProfile(
            Long userId
    ) {

        List<UserBehavior> behaviors =
                userBehaviorRepository
                        .findByUserId(userId);

        Set<String> interests =
                new HashSet<>();

        Map<String, Integer> skills =
                new HashMap<>();

        List<String> completedCourses =
                new ArrayList<>();

        for (
                UserBehavior behavior
                : behaviors
        ) {

            try {

                JSONObject metadata =
                        new JSONObject(
                                behavior.getMetadata()
                        );

                String eventName =
                        behavior.getEventName();

                if (
                        "course_view"
                                .equals(eventName)
                ) {

                    String category =
                            metadata.optString(
                                    "categoryName"
                            );

                    String courseName =
                            metadata.optString(
                                    "courseName"
                            );

                    if (!category.isBlank()) {

                        interests.add(
                                category.toLowerCase()
                        );
                    }

                    if (
                            courseName
                                    .toLowerCase()
                                    .contains("python")
                    ) {

                        skills.put(
                                "Python",

                                skills.getOrDefault(
                                        "Python",
                                        0
                                ) + 1
                        );
                    }
                }

                if (
                        "lesson_complete"
                                .equals(eventName)
                ) {

                    String lessonTitle =
                            metadata.optString(
                                    "lessonTitle"
                            );

                    Integer learningTime =
                            metadata.optInt(
                                    "learningTime"
                            );

                    if (
                            lessonTitle
                                    .toLowerCase()
                                    .contains("python")
                    ) {

                        skills.put(
                                "Python",

                                skills.getOrDefault(
                                        "Python",
                                        0
                                ) + 2
                        );
                    }

                    if (
                            learningTime > 600
                    ) {

                        completedCourses.add(
                                lessonTitle
                        );
                    }
                }

            } catch (Exception e) {

                e.printStackTrace();
            }
        }

        AIRecommendationRequest profile =
                AIRecommendationRequest
                        .builder()

                        .careerGoal(
                                interests.contains(
                                        "artificial intelligence"
                                )
                                        ? "ai engineer"
                                        : "software engineer"
                        )

                        .interests(
                                new ArrayList<>(
                                        interests
                                )
                        )

                        .skills(skills)

                        .experienceLevel(
                                "BEGINNER"
                        )

                        .learningGoalType(
                                "career_switch"
                        )

                        .preferredLearningStyle(
                                "hands_on"
                        )

                        .availableHoursPerWeek(
                                10
                        )

                        .targetTimelineMonths(
                                6
                        )

                        .preferredContentType(
                                List.of(
                                        "video",
                                        "project"
                                )
                        )

                        .completedCourses(
                                completedCourses
                        )

                        .build();

        System.out.println(
                "===== BUILT PROFILE ====="
        );

        System.out.println(profile);

        return profile;
    }
}
