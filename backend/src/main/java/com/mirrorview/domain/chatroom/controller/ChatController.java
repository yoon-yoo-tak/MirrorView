package com.mirrorview.domain.chatroom.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
	웹 소켓 api
 */

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ChatService chatService;

	// 전체 방 가져오기
	@MessageMapping("/chatrooms.get")
	public void getChatRooms(Principal principal) {
		log.info("전체 방 가져오기");
		List<ChatRoom> chatRooms = chatService.allRoom();
		simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/sub/chatrooms", chatRooms);
	}
	
	// 채팅 방 채팅기록
	@MessageMapping("/chatrooms/{roomId}")
	public void getChat(@DestinationVariable String roomId, Principal principal){
		log.info("{} 채팅방 채팅 기록", roomId);
		List<ChatMessage> chatMessages = chatService.getChat(roomId);
		simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/sub/chatrooms/"+roomId, chatMessages);
	}

	// 채팅 보내기
	@MessageMapping("/chatrooms.send/{roomId}")
	public void sendChat(@DestinationVariable String roomId, ChatMessage chatMessage, Principal principal){
		log.info("{} 방에 채팅 보내기", roomId );
		chatMessage.setTimestamp(LocalDateTime.now());
		String userId = principal.getName();
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

	// @MessageMapping("/count")
	// public void countUsers(){
	// 	long userCount = chatService.totalUserCount();
	// 	Map<String, Long> response = new HashMap<>();
	// 	response.put("userCount", userCount);
	// 	simpMessagingTemplate.convertAndSend("/sub/count", response);
	// }
}
