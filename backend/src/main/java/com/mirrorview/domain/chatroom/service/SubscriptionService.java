package com.mirrorview.domain.chatroom.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.repository.ChatRepository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

// 채널별 유저 수 관리 서비스
// 전체 유저는 실시간
// 각 방은 redis 에 저장해서 불러와서, 실시간 아님
@Service
@Getter
@RequiredArgsConstructor
public class SubscriptionService {
	// 유저, sub-id, roomId
	private final ConcurrentMap<String, ConcurrentMap<String, String>> userIdToSubscriptionMap = new ConcurrentHashMap<>();
	private final ChatRepository chatRepository;
	private final SimpMessagingTemplate simpMessagingTemplate;

	// 접속한 전체 유저들
	private final Set<String> subscribedUsers = Collections.synchronizedSet(new HashSet<>());
	
	// 채널 구독
	public void handleSubscribe(String userId, String subscriptionId, String roomId) {
		userIdToSubscriptionMap
			.computeIfAbsent(userId, k -> new ConcurrentHashMap<>())
			.put(subscriptionId, roomId);
		incrementRoomCount(userId, roomId);
	}
	
	// 채널 구독 취소
	public void handleUnsubscribe(String userId, String subscriptionId) {
		ConcurrentMap<String, String> userSubscriptions = userIdToSubscriptionMap.get(userId);
		if (userSubscriptions != null) {
			String roomId = userSubscriptions.remove(subscriptionId);
			if (roomId != null) {
				decrementRoomCount(userId, roomId);
			}
		}
	}

	public void incrementRoomCount(String userId, String roomId) {
		System.out.println("구독하려는 방 " + roomId);
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.setCount(chatRoom.getCount() + 1);
			chatRepository.save(chatRoom);
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	public void decrementRoomCount(String userId, String roomId) {
		System.out.println("구독 취소하려는 방 " + roomId);
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.setCount(chatRoom.getCount() - 1);
			chatRepository.save(chatRoom);
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	public void incrementTotalUserCount(String userId) {
		subscribedUsers.add(userId);

		userIdToSubscriptionMap
			.computeIfAbsent(userId, k -> new ConcurrentHashMap<>())
			.put("total", "total");

		simpMessagingTemplate.convertAndSend("/sub/count", subscribedUsers.stream().count()); // 카운터 값 전송
	}

	public void decrementTotalUserCount(String userId) {
		subscribedUsers.remove(userId);
		simpMessagingTemplate.convertAndSend("/sub/count", subscribedUsers.stream().count()); // 카운터 값 전송
	}

	public void handleForceUnsubscribe(String userId) {
		ConcurrentMap<String, String> userSubscriptions = userIdToSubscriptionMap.get(userId);
		if (userSubscriptions != null) {
			String roomId = userSubscriptions.remove("total");
			if ("total".equals(roomId)) {
				subscribedUsers.remove(userId);
				simpMessagingTemplate.convertAndSend("/sub/count", subscribedUsers.size());
			}
		}
	}
}