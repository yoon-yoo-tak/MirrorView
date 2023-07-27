package com.mirrorview.domain.interview.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.dto.RoomResponseDto;
import com.mirrorview.domain.interview.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class InterviewServiceImpl implements InterviewService {

	private final RedisTemplate<String, InterviewRoom> template;
	private final InterviewRepository interviewRepository;

	@Override
	public List<RoomResponseDto> findRoom() {

		Iterable<InterviewRoom> rooms = interviewRepository.findAll();
		List<RoomResponseDto> result = new ArrayList<>();
		rooms.forEach(room -> {
			if (room != null) {
				RoomResponseDto roomResponseDto = RoomResponseDto.build(room);
				result.add(roomResponseDto);
			}
		});

		return result;
	}

	@Override
	public void create(String nickname, RoomRequestDto requestDto) {
		InterviewRoom createRoom = requestDto.toEntity(nickname);
		createRoom.join(nickname);
		interviewRepository.save(createRoom);
		System.out.println(interviewRepository.count());
	}

	private String findRoomId(Cursor<byte[]> keys) {
		String key = new String(keys.next());
		int index = key.indexOf(":");

		return key.substring(index + 1);
	}
}
