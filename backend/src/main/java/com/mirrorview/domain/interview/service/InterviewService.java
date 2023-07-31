package com.mirrorview.domain.interview.service;

import java.util.List;
import java.util.Optional;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;

public interface InterviewService {
	List<RoomResponseDto> findRoom();

	void create(String nickname, RoomRequestDto requestDto);

	void exitRoom(String nickname, String roomId);

	List<RoomMemberInfo> joinRoom(String nickname, String roomId);

	void changeReady(RoomMemberInfo memberInfo, InterviewRoom room);

	Optional<InterviewRoom> findRoomById(String roomId);
}

