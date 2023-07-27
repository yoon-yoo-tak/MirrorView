package com.mirrorview.domain.interview.service;

import java.util.List;

import com.mirrorview.domain.interview.dto.RoomResponseDto;

public interface InterviewService {
	List<RoomResponseDto> findRoom();
}
