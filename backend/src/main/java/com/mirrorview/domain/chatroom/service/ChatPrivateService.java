package com.mirrorview.domain.chatroom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatPrivateRoom;
import com.mirrorview.domain.chatroom.repository.ChatPrivateRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatPrivateService {
	private final ChatPrivateRepository chatPrivateRepository;

	public List<ChatPrivateRoom> getAllChatRoomsForUser(String userId) {
		return chatPrivateRepository.findBySenderOrReceiver(userId, userId);
	}

	public ChatPrivateRoom getPrivateChatRoom(String sender, String receiver) {
		Optional<ChatPrivateRoom> existingRoom1 = chatPrivateRepository.findBySenderAndReceiver(sender, receiver);
		Optional<ChatPrivateRoom> existingRoom2 = chatPrivateRepository.findBySenderAndReceiver(receiver, sender);

		if (existingRoom1.isPresent()) {
			return existingRoom1.get();
		} else if (existingRoom2.isPresent()) {
			return existingRoom2.get();
		}

		// 존재하지 않는 경우, 새로운 방 생성 및 저장
		ChatPrivateRoom newRoom = ChatPrivateRoom.builder()
			.sender(sender)
			.receiver(receiver)
			.build();

		return chatPrivateRepository.save(newRoom);
	}

	public ChatPrivateRoom addChatMessageToPrivateRoom(String roomId, ChatMessage chatMessage) {
		Optional<ChatPrivateRoom> chatRoomOptional = chatPrivateRepository.findById(roomId);
		if (chatRoomOptional.isPresent()) {
			ChatPrivateRoom chatRoom = chatRoomOptional.get();
			chatRoom.getMessages().add(chatMessage);
			return chatPrivateRepository.save(chatRoom);
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	public List<ChatMessage> getPrivateChat(String roomId) {
		Optional<ChatPrivateRoom> chatRoom = chatPrivateRepository.findById(roomId);
		if (chatRoom.isPresent()) {
			List<ChatMessage> chatMessages = chatRoom.get().getMessages();
			return chatMessages;
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}
}
