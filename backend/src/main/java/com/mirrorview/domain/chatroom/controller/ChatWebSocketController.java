package com.mirrorview.domain.chatroom.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.service.ChatService;
import com.mirrorview.global.auth.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
	웹 소켓 api
 */

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatWebSocketController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService;

	// 전체 방 가져오기
	@MessageMapping("/chatrooms.get")
	public void getChatRooms(@Payload(required = false) String payload, Principal principal) {
		// Authentication authentication = (Authentication) principal;
		// CustomMemberDetails user = (CustomMemberDetails) authentication.getPrincipal();
		// String userNickname = user.getUsername();
		String userNickname = principal.getName();
		log.info("전체 방 가져오기 {} 에게", userNickname);
		List<ChatRoom> chatRooms = chatService.allRoom();
		simpMessagingTemplate.convertAndSendToUser(userNickname, "/sub/chatrooms", chatRooms);
	}
	
	// 채팅 방 채팅기록
	@MessageMapping("/chatrooms/{roomId}")
	public void getChat(@DestinationVariable String roomId, Principal principal){
		String userNickname = principal.getName();
		log.info("{} 채팅방 채팅 기록 {}에게", roomId, userNickname);
		List<ChatMessage> chatMessages = chatService.getChat(roomId);
		System.out.println(chatMessages);
		simpMessagingTemplate.convertAndSendToUser(userNickname, "/sub/chatrooms/"+roomId, chatMessages);
	}

	// 채팅 보내기
	@MessageMapping("/chatrooms.send/{roomId}")
	public void sendChat(@DestinationVariable String roomId, @Payload ChatMessage chatMessage){
		log.info("{} 방에 채팅 보내기", roomId );
		chatMessage.setTimestamp(LocalDateTime.now());
		chatService.addChatMessageToChatRoom(roomId, chatMessage);
		simpMessagingTemplate.convertAndSend("/sub/chatrooms/"+roomId, chatMessage);
	}

	// 방만들기
	@MessageMapping("/chatrooms.create")
	public void createChatRoom(ChatRoom chatRoom) {
		log.info("방만들기");
		ChatRoom newChatRoom = chatService.createChatRoom(chatRoom.getId());
		simpMessagingTemplate.convertAndSend("/sub/chatrooms.create", newChatRoom);
	}
}
