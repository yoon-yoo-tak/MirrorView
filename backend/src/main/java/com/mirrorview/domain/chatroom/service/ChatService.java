package com.mirrorview.domain.chatroom.service;

import java.util.List;
import java.util.Set;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;

public interface ChatService {

	List<ChatRoom> allRoom();

	ChatRoom createChatRoom(String roomId);

	void deleteChatRoom(String roomId);

	ChatRoom addUserToChatRoom(String roomId, String userId);

	ChatRoom removeUserFromChatRoom(String roomId, String userId);

	ChatRoom addChatMessageToChatRoom(String roomId, ChatMessage chatMessage);

	Set<String> getUsersInChatRoom(String roomId);

	List<ChatMessage> getChat(String roomId);

	int getCountOfUsersInChatRoom(String roomId);

	public String userInRoom(String userId);

	void incrementUserCount(String userid);

	void decrementUserCount(String userid);

	public long totalUserCount();

}