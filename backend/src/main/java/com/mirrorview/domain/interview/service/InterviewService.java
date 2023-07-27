package com.mirrorview.domain.interview.service;

import java.util.List;

import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;

public interface InterviewService {
	List<RoomResponseDto> findRoom();

	void create(String nickname, RoomRequestDto requestDto);

	void exitRoom(String nickname, String roomId);

	List<RoomMemberInfo> joinRoom(String nickname, String roomId);
}
