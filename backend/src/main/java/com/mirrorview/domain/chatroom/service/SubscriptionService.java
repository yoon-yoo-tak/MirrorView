package com.mirrorview.domain.chatroom.service;

import java.util.Collections;
import java.util.HashMap;
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
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.domain.interview.service.InterviewService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

// 채널별 유저 수 관리 서비스
// 전체 유저 count 실시간, 각 방 유저 count 실시간
/**
SubscriptionService
	│	채팅 구독
	├── handleChatRoomSubscribe(userId, subscriptionId, roomId)
	│   ├── addSubscription(userId, subscriptionId, roomId)
	│   └── incrementRoomCount(roomId)
	│       ├── (optional) chatRoom.setCount(...)
	│       └── sendRoomUserCount(roomId, count)
	│
    │	면접방 구독
	├── handleInterviewRoomSubscribe(userId, subscriptionId, roomId)
	│   ├── addSubscription(userId, subscriptionId, roomId)
	│   └── interviewRoomSystemMessage(userId, roomId, message)
	│
    │   채팅 구독 취소
	├── handleUnsubscribe(userId, subscriptionId)
	│   └── removeSubscription(userId, subscriptionId)
	│       ├── (optional) decrementRoomCount(roomId)
	│       │   ├── (optional) chatRoom.setCount(...)
	│       │   └── sendRoomUserCount(roomId, count)
	│
    │   면접방 구독 취소
	├── handleInterviewRoomUnsubscribe(userId)
	│   └── (loop) handleUnsubscribe(userId, subscriptionId)
	│       └── interviewRoomSystemMessage(userId, roomId, message)
	│	
 	│   전체 채팅 인원
	├── incrementTotalUserCount(userId)
	├── decrementTotalUserCount(userId)
    │
	│   강제 종료시 구독 취소
	└── handleForceUnsubscribe(userId)
 */


@Service
@Getter
@RequiredArgsConstructor
public class SubscriptionService {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final ConcurrentMap<String, ConcurrentMap<String, String>> userIdToSubscriptionMap = new ConcurrentHashMap<>();
	private final Set<String> subscribedUsers = Collections.synchronizedSet(new HashSet<>());
	private final ChatRepository chatRepository;
	private final InterviewService interviewService;

	public void handleChatRoomSubscribe(String userId, String subscriptionId, String roomId) {
		addSubscription(userId, subscriptionId, roomId);
		incrementRoomCount(roomId);
	}

	public void handleInterviewRoomSubscribe(String userId, String subscriptionId, String roomId) {
		addSubscription(userId, subscriptionId, roomId);
		interviewRoomSystemMessage(userId, roomId, "님이 입장하셨습니다");
	}

	public void handleUnsubscribe(String userId, String subscriptionId) {
		removeSubscription(userId, subscriptionId);
	}

	public void handleInterviewRoomUnsubscribe(String userId) {
		ConcurrentMap<String, String> userSubscriptions = userIdToSubscriptionMap.get(userId);
		if (userSubscriptions != null) {
			for (String subscriptionId : userSubscriptions.keySet()) {
				String roomId = userSubscriptions.get(subscriptionId);
				if (roomId != null && roomId.startsWith("interviewRoom")) {
					handleUnsubscribe(userId, subscriptionId);
					interviewRoomForceExit(userId, roomId);
					interviewRoomSystemMessage(userId, roomId, "님이 퇴장하셨습니다.");
				}
			}
		}
	}

	private void addSubscription(String userId, String subscriptionId, String roomId) {
		userIdToSubscriptionMap.computeIfAbsent(userId, k -> new ConcurrentHashMap<>()).put(subscriptionId, roomId);
	}

	private void removeSubscription(String userId, String subscriptionId) {
		ConcurrentMap<String, String> userSubscriptions = userIdToSubscriptionMap.get(userId);
		if (userSubscriptions != null) {
			String roomId = userSubscriptions.remove(subscriptionId);
			if (roomId != null && !roomId.startsWith("interviewRoom")) {
				decrementRoomCount(roomId);
			}
		}
	}

	private void incrementRoomCount(String roomId) {
		System.out.println("구독하려는 방 " + roomId);
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		chatRoomOptional.ifPresentOrElse(chatRoom -> {
			chatRoom.setCount(chatRoom.getCount() + 1);
			chatRepository.save(chatRoom);
			sendRoomUserCount(roomId, chatRoom.getCount());
		}, () -> {
			throw new RuntimeException("방이 존재하지 않습니다.");
		});
	}

	private void decrementRoomCount(String roomId) {
		System.out.println("구독 취소하려는 방 " + roomId);
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		chatRoomOptional.ifPresentOrElse(chatRoom -> {
			chatRoom.setCount(chatRoom.getCount() - 1);
			chatRepository.save(chatRoom);
			sendRoomUserCount(roomId, chatRoom.getCount());
		}, () -> {
			throw new RuntimeException("방이 존재하지 않습니다.");
		});
	}

	private void sendRoomUserCount(String roomId, int count) {
		System.out.println("chatroom user count 동작");
		Map<String, Object> payload = new HashMap<>();
		payload.put("roomId", roomId); // 방 ID도 함께 보냅니다.
		payload.put("count", count);
		System.out.println(payload);
		simpMessagingTemplate.convertAndSend("/sub/chatrooms.count", payload);
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

	public void interviewRoomForceExit(String userId, String roomId){
		System.out.println(roomId);
		if (!roomId.startsWith("interviewRoom")) {
			// roomId가 "interviewRoom"으로 시작하지 않으면 메서드를 종료
			return;
		}
		System.out.println(11111111);
		interviewService.exitRoom(userId, roomId);

		Map<String, Object> data = new HashMap<>();
		data.put("nickname", userId);

		MessageDto messageDto = MessageDto.builder()
			.type("EXIT")
			.data(data)
			.build();

		simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, messageDto);
	}

	public void interviewRoomSystemMessage(String userId, String roomId, String suffix){
		if (!roomId.startsWith("interviewRoom")) {
			// roomId가 "interviewRoom"으로 시작하지 않으면 메서드를 종료
			return;
		}

		MessageDto systemMessage = MessageDto.builder()
			.type("SYSTEM")
			.data(Map.of("memberId", "system", "message", userId + suffix))
			.build();

		simpMessagingTemplate.convertAndSend("/sub/interviewrooms/" + roomId, systemMessage);
	}
}