package com.mirrorview.domain.chatroom.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.repository.ChatRepository;

import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketEventsService{

	private final ChatService chatService;
	private final SimpMessagingTemplate messagingTemplate;

	public void handleWebSocketConnectListener(String userId) {
		chatService.incrementUserCount(userId);
	}

	public void handleWebSocketDisconnectListener(String userId) {
		chatService.decrementUserCount(userId);
	}

	public void handleWebSocketSubscribeListener(String roomId, String userId) {
		chatService.addUserToChatRoom(roomId, userId);
	}

	public void handleSessionUnsubscribeEvent(String roomId, String userId) {
		chatService.removeUserFromChatRoom(roomId, userId);
	}
}