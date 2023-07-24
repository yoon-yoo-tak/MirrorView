package com.mirrorview.domain.chatroom.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.dto.ChatMessage;
import com.mirrorview.domain.chatroom.service.ChatRoomService;
import com.mirrorview.domain.chatroom.service.UserChatRoomService;
import com.mirrorview.global.response.BaseResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(value = "Chat", tags = {"Chat Controller"}, description = "채팅 관련 API")
public class ChatController {

	private final ChatRoomService chatRoomService;
	private final UserChatRoomService userChatRoomService;
	private final RedisTemplate<String, ChatMessage> template;

	// 채팅방 만들기
	@PostMapping("/api/chats/open/{room}")
	public ResponseEntity createChatRoom(@PathVariable String room, @AuthenticationPrincipal UserDetails userDetails) {
		log.info("방 만들기");
		if (chatRoomService.findByRoom(room)) {
			String userId = userDetails.getUsername();
			chatRoomService.createRoom(room, userId);
		}

		return BaseResponse.ok(HttpStatus.OK, "채팅방이 생성되었습니다.");
	}

	// 나의 채팅방 가져오기
	@GetMapping("/api/chats")
	public ResponseEntity<?> createChatRoom(@AuthenticationPrincipal UserDetails userDetails) {
		log.info("나의 오픈 채팅 방 가져오기");
		String userName = userDetails.getUsername();
		List<ChatRoom> chatRoomList = userChatRoomService.findByUserChatRoom(userName);
		System.out.println(chatRoomList);

		return BaseResponse.okWithData(HttpStatus.OK, "방을 불러옵니다", chatRoomList);
	}

	// 모든 채팅방 가져오기
	@GetMapping("/api/chats/open")
	public ResponseEntity<?> createChatRoom() {
		log.info("모든 오픈 채팅 방 가져오기");
		List<ChatRoom> chatRoomList = chatRoomService.findAll();
		return BaseResponse.okWithData(HttpStatus.OK, "모든 방을 불러옵니다", chatRoomList);
	}

	// 채팅방 입장
	@PostMapping("/api/chats/join/{room}")
	public ResponseEntity joinChatRoom(@PathVariable String room, @AuthenticationPrincipal UserDetails userDetails) {
		userChatRoomService.joinChatRoom(userDetails.getUsername(), room);
		return BaseResponse.ok(HttpStatus.OK, "채팅방을 들어갔습니다.");
	}

	// 채팅방 나가기
	@DeleteMapping("/api/chats/quit/{room}")
	public ResponseEntity quitChatRoom(@PathVariable String room, @AuthenticationPrincipal UserDetails userDetails) {
		userChatRoomService.quitChatRoom(userDetails.getUsername(), room);
		return BaseResponse.ok(HttpStatus.OK, "채팅방을 나갔습니다.");
	}

	// 채팅방에 채팅보내기
	@MessageMapping("/chats/{room}")
	@SendTo("/sub/chats/{room}")
	@ApiOperation(value = "Send a chat message", notes = "채팅방에 메시지를 보냅니다")
	public ChatMessage handleChat(@DestinationVariable String room,
		@ApiParam(value = "Chat message to send", required = true) ChatMessage message) {

		message.setTimestamp(LocalDateTime.now());
		String key = "roomName:" + room;
		template.opsForList().rightPush(key, message);

		return message;
	}

	// 채팅방의 이전 채팅 기록 가져오기
	@GetMapping("/chats/history/{room}")
	@ApiOperation(value = "Get chat history", notes = "해당되는 채팅방의 이전 채팅 기록을 가져옵니다")
	public ResponseEntity<List<ChatMessage>> getChatHistory(
		@PathVariable @ApiParam(value = "Room name", required = true) String room) {

		String key = "roomName:" + room;
		List<ChatMessage> history = template.opsForList().range(key, 0, -1);

		return ResponseEntity.ok(history);
	}
}