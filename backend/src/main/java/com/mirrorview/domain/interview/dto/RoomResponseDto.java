package com.mirrorview.domain.interview.dto;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RoomResponseDto {

    private String roomId;
    private String title;
    private String category;
    private Integer maxMemberCount;
    private Integer currentMemberCount;
    private Boolean havePassword;
    private String host;
    private boolean isStarted;

    public static RoomResponseDto build(InterviewRoom room) {
        return RoomResponseDto
                .builder()
                .roomId(room.getId())
                .host(room.getHost())
                .title(room.getTitle())
                .category(room.getCategory())
                .maxMemberCount(room.getMaxMemberCount())
                .currentMemberCount(room.getCurrentCount())
                .havePassword(room.havePassword())
                .isStarted(room.isStarted())
                .build();
    }
}
