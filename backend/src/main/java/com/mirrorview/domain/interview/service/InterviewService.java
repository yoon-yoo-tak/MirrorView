package com.mirrorview.domain.interview.service;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;
import com.mirrorview.domain.user.domain.Member;

import java.util.List;
import java.util.Optional;

public interface InterviewService {
    List<RoomResponseDto> findRoom();

    InterviewRoom create(Member member, RoomRequestDto requestDto);

    void exitRoom(String nickname, String roomId);

    InterviewRoom joinRoom(Member member, String roomId);

    void changeReady(RoomMemberInfo memberInfo, InterviewRoom room);

    Optional<InterviewRoom> findRoomById(String roomId);

    List<RoomResponseDto> findRoomByCategory(String category);
}

