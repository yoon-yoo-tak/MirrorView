package com.mirrorview.domain.chatroom.listener;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.context.event.EventListener;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisKeyExpiredEvent;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.mirrorview.domain.chatroom.domain.ChatUser;
import com.mirrorview.domain.chatroom.repository.ChatRepository;
import com.mirrorview.domain.chatroom.repository.ChatUserRepository;
import com.mirrorview.domain.interview.dto.MessageDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class RedisKeyExpirationListener implements MessageListener {

	private final SimpMessagingTemplate messagingTemplate;
	private final ChatRepository chatRepository;
	private final ChatUserRepository chatUserRepository;
	private final StringRedisTemplate stringRedisTemplate;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		String expiredKey = message.toString();
		System.out.println("Expired Key: " + expiredKey);
		String[] parts = expiredKey.split(":");
		String extractedValue = parts[1];
		// TTL 로 삭제되지만, 한번 더 확인
		if (!stringRedisTemplate.hasKey(expiredKey)) {
			if (parts.length > 1) {
				chatRepository.deleteById(expiredKey);
			}
		}

		// 이 방에 대한 즐겨찾기 제거
		Iterable<ChatUser> users = chatUserRepository.findAll();
		for (ChatUser user : users) {
			if (user.getFavoriteChatRoomIds().contains(extractedValue)) {
				user.getFavoriteChatRoomIds().remove(extractedValue);
				chatUserRepository.save(user);
			}
		}

		MessageDto messageDto = MessageDto.builder()
			.type("delete")
			.data(Map.of("roomId", extractedValue))
			.build();

		messagingTemplate.convertAndSend("/sub/chatrooms.room", messageDto);
	}
}