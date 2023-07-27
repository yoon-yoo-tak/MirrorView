package com.mirrorview.domain.interview.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.dto.RoomResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class InterviewServiceImpl implements InterviewService {

	private final RedisTemplate<String, InterviewRoom> template;

	@Override
	public List<RoomResponseDto> findRoom() {

		String key = "interviewRoom*";
		ScanOptions scanOptions = ScanOptions.scanOptions().match(key).count(10).build();
		Cursor<byte[]> keys = Objects.requireNonNull(template.getConnectionFactory()).getConnection().scan(scanOptions);
		List<RoomResponseDto> rooms = new ArrayList<>();
		while (keys.hasNext()) {
			String roomId = findRoomId(keys);
			Map<Object, Object> entries = template.opsForHash().entries(roomId);
			log.info("{}", entries);
			RoomResponseDto room = RoomResponseDto.build(roomId, entries);
			rooms.add(room);
		}
		return rooms;
	}

	private String findRoomId(Cursor<byte[]> keys) {
		String key = new String(keys.next());
		int index = key.indexOf(":");

		return key.substring(index + 1);
	}
}
