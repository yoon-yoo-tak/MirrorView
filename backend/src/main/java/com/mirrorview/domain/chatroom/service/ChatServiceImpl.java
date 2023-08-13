package com.mirrorview.domain.chatroom.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.repository.ChatRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import lombok.Getter;

@Service
@RequiredArgsConstructor
@Slf4j
@Getter
public class ChatServiceImpl implements ChatService {

	private final SimpMessagingTemplate template;
	private final ChatRepository chatRepository;

	@Override
	public List<ChatRoom> allRoom() {
		List<ChatRoom> chatRooms = (List<ChatRoom>)chatRepository.findAll();
		return chatRooms.stream()
			.filter(room -> room != null)
			.collect(Collectors.toList());
	}

	@Override
	public ChatRoom createChatRoom(String roomId) {
		Optional<ChatRoom> byId = chatRepository.findById(roomId);
		if (byId.isPresent()) {
			throw new RuntimeException("같은 이름의 방이 존재합니다.");
		}
		ChatRoom chatRoom = ChatRoom.builder()
			.id(roomId)
			.users(new HashSet<>())
			.messages(new ArrayList<>())
			.count(0)
			.build();

		chatRoom.setExpiration(60L * 1);

		chatRepository.save(chatRoom);
		return chatRoom;
	}

	@Override
	public ChatRoom addChatMessageToChatRoom(String roomId, ChatMessage chatMessage) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if (chatRoomOptional.isPresent()) {
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.getMessages().add(chatMessage);
			return chatRepository.save(chatRoom);
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	@Override
	public List<ChatMessage> getChat(String roomId) {
		Optional<ChatRoom> chatRoom = chatRepository.findById(roomId);
		if (chatRoom.isPresent()) {
			List<ChatMessage> chatMessages = chatRoom.get().getMessages();
			return chatMessages;
		} else
			throw new RuntimeException("방이 존재하지 않습니다.");
	}
}
