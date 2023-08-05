package com.mirrorview.domain.interview.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class InterviewWebSocketController {

	private final InterviewService interviewService;
	private final SimpMessagingTemplate simpMessagingTemplate;

	// 채널 하나만 구독해서 전부 처리할거임
	@MessageMapping("/interviewrooms/{roomId}")
	public void sendToAll(@DestinationVariable String roomId, MessageDto messageDto, Principal principal){
		log.info("interview 동작, {}", roomId);
		switch (messageDto.getType()) {
			case "JOIN":
				// 방 입장 처리
				break;
			case "CHAT":
				System.out.println(messageDto);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/"+roomId, messageDto);
				break;
			case "SYSTEM":
				// 시스템 메시지 처리
				break;
			case "READY":
				// 레디 상태 처리
				break;
			case "READY_CANCEL":
				// 레디 캔슬 상태 처리
				break;

		}
	}

	// ready
	@MessageMapping("ready/{roomId}")
	@SendTo("/sub/ready/{roomId}")
	public ResponseEntity<?> changeReady(@DestinationVariable String roomId, RoomMemberInfo memberInfo) {
		//todo 저장하기
		Optional<InterviewRoom> room = interviewService.findRoomById(roomId);
		if (room.isEmpty()) {
			return BaseResponse.fail("방정보 없음", 400);
		}
		interviewService.changeReady(memberInfo, room.get());
		return BaseResponse.okWithData(HttpStatus.OK, "레디 변경", memberInfo);
	}


}
