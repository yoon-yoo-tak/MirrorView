package com.mirrorview.domain.interview.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.interview.domain.InterviewRoom;
import com.mirrorview.domain.interview.domain.RoomMemberInfo;
import com.mirrorview.domain.interview.dto.RoomRequestDto;
import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.global.auth.jwt.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(value = "Interview", tags = {"InterView Controller"})
@RequestMapping("/api/interviews")
public class InterviewController {

	private final InterviewService interviewService;

	@GetMapping("/rooms")
	public ResponseEntity<?> getRooms() {
		return BaseResponse.okWithData(HttpStatus.OK, "방 정보 조회 완료", interviewService.findRoom());
	}

	@PostMapping("/create")
	public ResponseEntity<?> createRoom(@RequestBody RoomRequestDto requestDto,
		@AuthenticationPrincipal CustomMemberDetails member) {
		Member user = member.getUser();
		String nickname = user.getNickname();
		System.out.println("nickname = " + nickname);
		interviewService.create(nickname, requestDto);
		return BaseResponse.ok(HttpStatus.OK, "테스트");
	}

	@PostMapping("/exit/{roomId}")
	public ResponseEntity<?> exitRoom(@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable String roomId) {
		String nickname = member.getNickname();
		try {
			interviewService.exitRoom(nickname, roomId);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "나가기 완료");
	}

	@PostMapping("join/{roomId}")
	public ResponseEntity<?> joinRoom(@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable String roomId) {
		String nickname = member.getNickname();
		List<RoomMemberInfo> roomMemberInfos;
		try {
			roomMemberInfos = interviewService.joinRoom(nickname, roomId);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.okWithData(HttpStatus.OK, "조인 완료", roomMemberInfos);
	}

	// ready
	@MessageMapping("ready/{roomId}")
	@SendTo("/sub/ready/{roomId}")
	public ResponseEntity<?> changeReady(@DestinationVariable String roomId,RoomMemberInfo memberInfo ) {
		//todo 저장하기
		Optional<InterviewRoom> room = interviewService.findRoomById(roomId);
		if (room.isEmpty()) {
			return BaseResponse.fail("방정보 없음",400);
		}
		interviewService.changeReady(memberInfo,room.get());
		return BaseResponse.okWithData(HttpStatus.OK, "레디 변경", memberInfo);
	}
}
