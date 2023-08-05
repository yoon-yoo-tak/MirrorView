package com.mirrorview.domain.chatroom.event;

import java.util.concurrent.ConcurrentMap;

import com.mirrorview.domain.chatroom.service.ChatService;
import com.mirrorview.domain.chatroom.service.SubscriptionService;

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

	private final SubscriptionService subscriptionService;

	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
	}

	// 강제 종료하면, 해당 사용자가 구독한 모든 채널 찾아 unsubscribe
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		String userId = event.getUser().getName();
		ConcurrentMap<String, String> userSubscriptions = subscriptionService.getUserIdToSubscriptionMap().get(userId);
		if (userSubscriptions != null) {
			for (String subscriptionId : userSubscriptions.keySet()) {
				if(subscriptionId.equals("total")) {
					subscriptionService.handleForceUnsubscribe(userId);
					continue;
				}
				subscriptionService.handleUnsubscribe(userId, subscriptionId);
			}
		}
	}

	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		String userId = event.getUser().getName();
		String channel = (String)event.getMessage().getHeaders().get("simpDestination");
		String subscriptionId = event.getMessage().getHeaders().get("simpSubscriptionId").toString();

		// 전체 인원 카운터
		if (channel.startsWith("/sub/count")) {
			subscriptionService.incrementTotalUserCount(userId);
		}

		// 채팅방 카운터
		if (channel.startsWith("/sub/chatrooms/")) {
			String roomId = channel.split("/")[3];  // URL에서 roomId 추출
			subscriptionService.handleSubscribe(userId,  subscriptionId, roomId);
		}

		if(channel.startsWith("/sub/interviewrooms/")){
			log.info("면접방 입장 {}", userId );
			String roomId = channel.split("/")[3];  // URL에서 interview room id 추출
			subscriptionService.handleSubscribe(userId,  subscriptionId, roomId);
		}

	}

	@EventListener
	public void handleSessionUnsubscribeEvent(SessionUnsubscribeEvent event) {
		String userId = event.getUser().getName();
		String subscriptionId = event.getMessage().getHeaders().get("simpSubscriptionId").toString(); // 서브스크립션 ID 추출
		log.info("{}가 unsub {}", userId, subscriptionId);
		subscriptionService.handleUnsubscribe(userId, subscriptionId); // 구독 취소 처리
	}
}