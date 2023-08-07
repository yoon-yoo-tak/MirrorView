package com.mirrorview.global.event;

import java.security.Principal;
import java.util.concurrent.ConcurrentMap;

import org.springframework.context.event.EventListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import com.mirrorview.domain.chatroom.service.SubscriptionService;
import com.mirrorview.global.auth.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEvents {

	private final SubscriptionService subscriptionService;
	
	// 웹 소켓 연결 이벤트
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectEvent event) {
		Authentication authentication = (Authentication) event.getUser();
		CustomMemberDetails user = (CustomMemberDetails) authentication.getPrincipal();
	}

	// 웹 소켓 종료 이벤트 - 사용자가 강제 종료 시 구독한 채널들을 취소
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		Authentication authentication = (Authentication) event.getUser();
		CustomMemberDetails user = (CustomMemberDetails) authentication.getPrincipal();

		String userId = user.getNickname();
		System.out.println(userId + " 유저 나감 인터뷰에서");
		subscriptionService.handleInterviewRoomUnsubscribe(userId);
		ConcurrentMap<String, String> userSubscriptions = subscriptionService.getUserIdToSubscriptionMap().get(userId);
		if (userSubscriptions != null) {
			for (String subscriptionId : userSubscriptions.keySet()) {
				if (subscriptionId.equals("total")) {
					subscriptionService.handleForceUnsubscribe(userId);
					continue;
				}
				subscriptionService.handleUnsubscribe(userId, subscriptionId);
			}
		}
	}
	
	// 구독 이벤트
	@EventListener
	public void handleWebSocketSubscribeListener(SessionSubscribeEvent event) {
		Authentication authentication = (Authentication) event.getUser();
		CustomMemberDetails user = (CustomMemberDetails) authentication.getPrincipal();

		String userId = user.getNickname();
		String channel = (String)event.getMessage().getHeaders().get("simpDestination");
		String subscriptionId = event.getMessage().getHeaders().get("simpSubscriptionId").toString();

		if (channel.startsWith("/sub/count")) {
			subscriptionService.incrementTotalUserCount(userId);
		}
		else if (channel.startsWith("/sub/chatrooms/")) {
			String roomId = channel.split("/")[3];
			subscriptionService.handleChatRoomSubscribe(userId, subscriptionId, roomId);
		}
		else if (channel.startsWith("/sub/interviewrooms/")) {
			log.info("면접방 입장 {}", userId);
			String roomId = channel.split("/")[3];
			subscriptionService.handleInterviewRoomSubscribe(userId, subscriptionId, roomId);
		}
	}
	
	// 구독 취소 이벤트
	@EventListener
	public void handleSessionUnsubscribeEvent(SessionUnsubscribeEvent event) {
		Authentication authentication = (Authentication) event.getUser();
		CustomMemberDetails user = (CustomMemberDetails) authentication.getPrincipal();

		String userId = user.getNickname();
		String subscriptionId = event.getMessage().getHeaders().get("simpSubscriptionId").toString();
		log.info("{}가 unsub {}", userId, subscriptionId);
		subscriptionService.handleUnsubscribe(userId, subscriptionId);
	}
}
