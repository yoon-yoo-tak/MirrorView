package com.mirrorview.domain.interview.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.MemberDto;
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.domain.user.service.MemberServiceImpl;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class InterviewWebSocketController {

	private final InterviewService interviewService;
	private final MemberService memberService;
	private final SimpMessagingTemplate simpMessagingTemplate;


	// 채널 하나만 구독해서 전부 처리할거임
	@MessageMapping("/interviewrooms/{roomId}")
	public void sendToAll(@DestinationVariable String roomId, @Payload MessageDto messageDto, Principal principal) {
		log.info("interview - {} 동작, {}", messageDto.getType(), messageDto);

		Authentication authentication = (Authentication) principal;
		CustomMemberDetails user = (CustomMemberDetails) authentication.getPrincipal();

		switch (messageDto.getType()) {

			case "CHAT":
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				break;

			/** 멤버에 대한 처리 (JOIN, EXIT, READY_CHANGE, ROLE_CHANGE) */

			case "JOIN": // sub 하면서 터뜨리기
				Optional<Member> byUser = memberService.findByUserId(user.getUsername());
				if(byUser.isPresent()){
					Member member = byUser.get();

					Map<String, Object> data = new HashMap<>();
					data.put("nickname", member.getNickname());
					data.put("email", member.getEmail());
					data.put("rating", member.getAverageRating());
					data.put("ready", false);
					data.put("essays", new ArrayList<>());
					data.put("role", "interviewee");

					messageDto.setData(data);
					simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				}
				break;
			case "EXIT": // unsub, unconnected
				interviewService.exitRoom(user.getNickname(), roomId);
				// 나간 멤버를 pub
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
			case "READY_CHANGE":
				MemberDto readyMember = (MemberDto)messageDto.getData();

				// (redis) 레디한 멤버의 상태를 토글
				RoomMemberInfo roomMemberInfo = interviewService.toggleReadyStatus(roomId, readyMember.getNickname());
				messageDto.setData((Map<String, Object>)roomMemberInfo);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);

				interviewService.systemMessage(principal.getName(), roomId, "님이 준비 상태를 변경했습니다.");
				break;

			case "ROLE_CHANGE":
				MemberDto roleMemberDto = (MemberDto)messageDto.getData();

				// 멤버의 역할 상태 토글하고 DB에 반영
				RoomMemberInfo roleMember = interviewService.toggleRoleStatus(roomId, roleMemberDto.getNickname());
				messageDto.setData((Map<String, Object>)roleMember);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);

				interviewService.systemMessage(principal.getName(), roomId, "님이 역할을 변경했습니다.");
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
