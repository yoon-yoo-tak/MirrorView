package com.mirrorview.domain.chatroom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.repository.UserChatRoomsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserChatRoomsService {

	private final UserChatRoomsRepository userChatRoomsRepository;

	public List<String> getChatRoomTitles(String userId){
		return userChatRoomsRepository.getChatRoomTitles(userId);
	}

	public void addChatRoomTitle(String userId, String chatRoomTitle){
		userChatRoomsRepository.addChatRoomTitle(userId, chatRoomTitle);
	}

	public void removeChatRoomTitle(String userId, String chatRoomTitle){
		userChatRoomsRepository.removeChatRoomTitle(userId, chatRoomTitle);
	}

}
