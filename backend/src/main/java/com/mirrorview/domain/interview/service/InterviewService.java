package com.mirrorview.domain.interview.service;

import java.util.List;
import java.util.Optional;

import com.mirrorview.domain.essay.dto.EssayListDto;
import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;
import com.mirrorview.domain.user.domain.Member;

public interface InterviewService {
    List<RoomResponseDto> findRoom();

    InterviewRoom create(Member member, RoomRequestDto requestDto);

    String exitRoom(String nickname, String roomId);

    InterviewRoom joinRoom(Member member, String roomId);

    void changeReady(RoomMemberInfo memberInfo, InterviewRoom room);

    //List<EssayListDto> getEssayListDtos(String userId);

    Optional<InterviewRoom> findRoomById(String roomId);

    List<RoomResponseDto> findRoomByCategory(Integer depth, String category);

    List<EssayListDto> getEssayListDtos(String userId);

    RoomMemberInfo toggleReadyStatus(String roomId, String userNickname);

    RoomMemberInfo toggleRoleStatus(String roomId, String username);

    void systemMessage(String userId, String roomId, String suffix);

    boolean startedState(String roomId);

    void checkRoomPassword(String roomId, String password);

    void startCancelState(String roomId);
}

