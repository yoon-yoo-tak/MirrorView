package com.mirrorview.domain.interview.dto;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RoomRequestDto {
    private String title;
    private String password;
    private String category;
    private Integer maxMemberCount;

    public InterviewRoom toEntity(String nickname) {
        if (password == null) {
            password = "";
        }
        if (maxMemberCount == null || maxMemberCount > 6) {
            maxMemberCount = 6;
        }
        if (maxMemberCount < 1) {
            maxMemberCount = 1;
        }

        return InterviewRoom.builder()
                .id("interviewRoom" + UUID.randomUUID())
                .title(title)
                .password(password)
                .category(category)
                .host(nickname)
                .members(new ArrayList<>())
                .maxMemberCount(maxMemberCount)
                .isStarted(false)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
