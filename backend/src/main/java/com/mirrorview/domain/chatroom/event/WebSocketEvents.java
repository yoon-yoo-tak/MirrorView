package com.mirrorview.domain.chatroom.event;

import com.mirrorview.domain.chatroom.service.ChatService;
import com.mirrorview.domain.chatroom.service.WebSocketEventsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

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
		String userId = event.getUser().getName();
		webSocketEventsService.handleWebSocketDisconnectListener(userId);
		chatService.decrementRoomCount(userId, chatService.userInRoom(userId));
	}

	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		String destination = (String)event.getMessage().getHeaders().get("simpDestination");
		String userId = event.getUser().getName();
		log.info("sub : {}", destination);

		// 각 방 카운터
		if (destination.startsWith("/sub/chatrooms/")) {
			String roomId = destination.split("/")[3];  // URL에서 roomId 추출
			log.info("{}가 채팅방{}에 입장",userId, roomId);
			chatService.incrementRoomCount(userId, roomId);
		}
		// 전체 인원 카운터
		if (destination.equals("/sub/count")) {
			chatService.totalUserCount();
		}
	}

	@EventListener
	public void handleSessionUnsubscribeEvent(SessionUnsubscribeEvent event) {
		String userId = event.getUser().getName();
		String previousRoom = chatService.userInRoom(userId);

		log.info("{}가 unsub {}", event.getUser().getName(), previousRoom);
		chatService.decrementRoomCount(userId, previousRoom);
		//webSocketEventsService.handleSessionUnsubscribeEvent(previousChatRoom, event.getUser().getName());
	}
}