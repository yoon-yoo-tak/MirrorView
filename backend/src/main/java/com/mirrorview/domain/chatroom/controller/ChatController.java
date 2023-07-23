package com.mirrorview.domain.chatroom.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.dto.ChatMessage;

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

	private final RedisTemplate<String, ChatMessage> template;

	// 채팅방에 채팅보내기
	@MessageMapping("/chats/{room}")
	@SendTo("/sub/chats/{room}")
	@ApiOperation(value = "Send a chat message", notes = "채팅방에 메시지를 보냅니다")
	public ChatMessage handleChat(@DestinationVariable String room,
		@ApiParam(value = "Chat message to send", required = true) ChatMessage message) {

		message.setTimestamp(LocalDateTime.now());
		String key = "roomName:" + room;
		template.opsForList().rightPush(key, message);

		System.out.println(message);

		return message;
	}

	// 채팅방의 이전 채팅 기록 가져오기
	@GetMapping("/chats/history/{room}")
	@ApiOperation(value = "Get chat history", notes = "해당되는 채팅방의 이전 채팅 기록을 가져옵니다")
	public ResponseEntity<List<ChatMessage>> getChatHistory(
		@PathVariable @ApiParam(value = "Room name", required = true) String room) {
		log.info("history method call");

		String key = "roomName:" + room;
		List<ChatMessage> history = template.opsForList().range(key, 0, -1);

		System.out.println(history);

		return ResponseEntity.ok(history);
	}
}