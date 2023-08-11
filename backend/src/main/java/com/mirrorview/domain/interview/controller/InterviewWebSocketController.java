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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.service.MemberService;
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

	// 채널 하나만 구독해서 전부 처리
	@MessageMapping("/interviewrooms/{roomId}")
	public void sendToAll(@DestinationVariable String roomId, @Payload MessageDto messageDto, Principal principal) {
		log.info("interview - {} 동작, {}", messageDto.getType(), messageDto.getData());

		Authentication authentication = (Authentication)principal;
		String name = authentication.getName();

		switch (messageDto.getType()) {

			case "ROOM_START_CANCEL":
			case "CHAT":
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				break;

			/** 멤버에 대한 처리 (JOIN, EXIT, READY_CHANGE, ROLE_CHANGE...) */

			case "JOIN": // sub 하면서 터뜨리기
				Optional<Member> byUser = memberService.findByNickname(name);
				if (byUser.isPresent()) {
					Member member = byUser.get();

					Map<String, Object> data = new HashMap<>();
					data.put("nickname", member.getNickname());
					data.put("email", member.getEmail());
					data.put("rating", member.getAverageRating());
					data.put("ready", false);
					data.put("essays", new ArrayList<>());
					data.put("role", "interviewee");
					data.put("photo", member.getPhoto());

					messageDto.setData(data);
					System.out.println(messageDto);
					simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				}
				break;

			case "EXIT": // unsub, unconnected
				String host = interviewService.exitRoom(name, roomId);
				log.info("{}", messageDto);
				messageDto.getData().put("host", host);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				break;

			case "READY_CHANGE":
				Map<String, Object> readyData = messageDto.getData();
				String userNicknameReady = (String)readyData.get("nickname");

				RoomMemberInfo readyMember = interviewService.toggleReadyStatus(roomId, userNicknameReady);
				readyData.put("nickname", readyMember.getNickname());
				readyData.put("email", readyMember.getEmail());
				readyData.put("rating", readyMember.getRating());
				readyData.put("ready", readyMember.isReady());
				readyData.put("essays", readyMember.getEssays());
				readyData.put("role", readyMember.getRole());

				messageDto.setData(readyData);
				System.out.println(readyData);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				if (readyMember.isReady())
					interviewService.systemMessage(principal.getName(), roomId, "님이 준비 완료했습니다.");
				if (!readyMember.isReady())
					interviewService.systemMessage(principal.getName(), roomId, "님이 준비 상태를 해제했습니다.");
				break;

			case "ROLE_CHANGE":
				Map<String, Object> data = messageDto.getData();
				String userNickname = (String)data.get("nickname");

				// 멤버의 역할 상태 토글하고 DB에 반영
				RoomMemberInfo roleMember = interviewService.toggleRoleStatus(roomId, userNickname);
				data.put("nickname", roleMember.getNickname());
				data.put("email", roleMember.getEmail());
				data.put("rating", roleMember.getRating());
				data.put("ready", roleMember.isReady());
				data.put("essays", roleMember.getEssays());
				data.put("role", roleMember.getRole());
				System.out.println(data);
				messageDto.setData(data);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				if (roleMember.getRole().equals("interviewer"))
					interviewService.systemMessage(principal.getName(), roomId, "님이 면접관으로 역할을 변경했습니다.");
				if (roleMember.getRole().equals("interviewee"))
					interviewService.systemMessage(principal.getName(), roomId, "님이 면접자로 역할을 변경했습니다.");
				break;

			case "MAIN_ESSAY":
				System.out.println(messageDto);
				simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
				interviewService.systemMessage(principal.getName(), roomId, "님이 대표 자소서를 변경했습니다.");
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
