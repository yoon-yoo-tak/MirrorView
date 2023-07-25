package com.mirrorview.domain.chatroom.event;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Getter
@RequiredArgsConstructor
public class WebSocketEvents {

	private final SimpMessagingTemplate messagingTemplate;
	private ConcurrentSkipListSet<String> users = new ConcurrentSkipListSet<>();

	private void sendUserUpdateEvent() {
		Map<String, Object> userUpdate = new HashMap<>();
		userUpdate.put("users", users);
		userUpdate.put("userCount", users.size());

		log.info("현재 접속한 유저들 {}", users);
		messagingTemplate.convertAndSend("/sub/user-update", userUpdate);
	}

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		String userId = event.getUser().getName();
		log.info("유저 입장 {}", userId);
		users.add(userId);
	}

	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		if ("/sub/user-update".equals(headerAccessor.getDestination())) {
			log.info("A new user has subscribed: {}", event.getUser().getName());
			sendUserUpdateEvent();
		}
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String userId = event.getUser().getName();
		log.info("유저 퇴장 {}", userId);
		users.remove(userId);
		sendUserUpdateEvent();
	}
}
