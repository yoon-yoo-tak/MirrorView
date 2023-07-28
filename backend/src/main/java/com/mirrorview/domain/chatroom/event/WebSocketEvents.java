package com.mirrorview.domain.chatroom.event;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.mirrorview.domain.chatroom.dto.ChatSubscriber;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
@Getter
public class WebSocketEvents {

	private final SimpMessagingTemplate messagingTemplate;
	private ConcurrentSkipListSet<String> totalUsers = new ConcurrentSkipListSet<>();
	private ConcurrentMap<String, List<ChatSubscriber>> subscriptions = new ConcurrentHashMap<>();
	private ConcurrentMap<String, String> userSubscription = new ConcurrentHashMap<>();


	private void sendUserUpdateEvent() {
		Map<String, Object> userUpdate = new HashMap<>();
		userUpdate.put("users", totalUsers);
		userUpdate.put("userCount", totalUsers.size());

		log.info("현재 접속한 유저들 {}", totalUsers);
		messagingTemplate.convertAndSend("/sub/user-update", userUpdate);
	}

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		String userId = event.getUser().getName();
		log.info("유저 입장 {}", userId);
		totalUsers.add(userId);
	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		// total
		String userId = event.getUser().getName();
		log.info("유저 퇴장 {}", userId);
		totalUsers.remove(userId);
		sendUserUpdateEvent();
	}

	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

		// total
		if ("/sub/user-update".equals(headerAccessor.getDestination())) {
			log.info("A new user has subscribed: {}", event.getUser().getName());
			sendUserUpdateEvent();
		}

		// open chat
		String destination = headerAccessor.getDestination().substring(11);
		log.info("{}가 구독 {}", event.getUser().getName(), destination);
		subscriptions.compute(destination, (k, v) -> {
			if (v == null) {
				v = new ArrayList<>();
			}
			synchronized (v) {
				v.add(new ChatSubscriber(event.getUser().getName()));
			}
			return v;
		});
		userSubscription.put(event.getUser().getName(), destination);
	}

	@EventListener
	public void handleSessionUnsubscribeEvent(SessionUnsubscribeEvent event) {
		String destination = userSubscription.get(event.getUser().getName());

		log.info("{}가 구독 취소 {}",event.getUser().getName(), destination);

		subscriptions.computeIfPresent(destination, (k, v) -> {
			synchronized (v) {
				v.removeIf(subscriber -> subscriber.getMemberId().equals(event.getUser().getName()));
			}
			return v;
		});
	}
}
