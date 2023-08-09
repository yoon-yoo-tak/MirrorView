package com.mirrorview.domain.chatroom.service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.domain.ChatUser;
import com.mirrorview.domain.chatroom.repository.ChatRepository;
import com.mirrorview.domain.chatroom.repository.ChatUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatUserService {

	private final ChatUserRepository chatUserRepository;
	private final ChatRepository chatRepository;

	public Set<ChatRoom> findFavoriteRoomsByUserId(String userId) {
		Optional<ChatUser> userOpt = chatUserRepository.findByUserId(userId);
		if(userOpt.isPresent()) {
			ChatUser user = userOpt.get();
			Set<ChatRoom> favoriteRooms = user.getFavoriteChatRoomIds()
				.stream()
				.map(chatRepository::findById)
				.filter(Optional::isPresent)
				.map(Optional::get)
				.collect(Collectors.toSet());
			return favoriteRooms;
		}
		return Collections.emptySet();
	}

	public void addChatRoomToFavorites(String userId, String roomId) {
		ChatUser user = chatUserRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
		user.getFavoriteChatRoomIds().add(roomId);
		chatUserRepository.save(user);
	}

	public void removeChatRoomFromFavorites(String userId, String roomId) {
		ChatUser user = chatUserRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
		user.getFavoriteChatRoomIds().remove(roomId);
		chatUserRepository.save(user);
	}


}
