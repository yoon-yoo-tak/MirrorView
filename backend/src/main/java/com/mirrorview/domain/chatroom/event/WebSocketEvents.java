package com.mirrorview.domain.chatroom.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import com.mirrorview.domain.chatroom.service.ChatService;
import com.mirrorview.domain.chatroom.service.WebSocketEventsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEvents {

	private final WebSocketEventsService webSocketEventsService;
	private final ChatService chatService;

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		webSocketEventsService.handleWebSocketConnectListener(event.getUser().getName());
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		webSocketEventsService.handleWebSocketDisconnectListener(event.getUser().getName());
	}
	
	
	// 아직 프론트는 user1(가명칭) 이고, 서버는 원래 유저의 id라서 해당 로직이 발생하지 않음
	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		String destination = (String) event.getMessage().getHeaders().get("simpDestination");
		String newRoomId = "";
		if (destination.startsWith("/sub/chatrooms/")) {
			newRoomId = destination.split("/")[3];  // URL에서 roomId 추출
		}

		System.out.println(newRoomId);

		if (!newRoomId.isEmpty()) {
			String previousRoomId = chatService.userInRoom(event.getUser().getName());
			if (previousRoomId != null && !previousRoomId.isEmpty()) {
				webSocketEventsService.handleSessionUnsubscribeEvent(previousRoomId, event.getUser().getName());
			}
			webSocketEventsService.handleWebSocketSubscribeListener(newRoomId, event.getUser().getName());
		}
	}

	/**
	 이전에 있었던 방이 어딘지 알아야함
	 */
	@EventListener
	public void handleSessionUnsubscribeEvent(SessionUnsubscribeEvent event) {
		String previousChatRoom = chatService.userInRoom(event.getUser().getName());
		webSocketEventsService.handleSessionUnsubscribeEvent(previousChatRoom, event.getUser().getName());
	}
}