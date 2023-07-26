package com.mirrorview.domain.chatroom.service;

import java.util.List;

import com.mirrorview.domain.chatroom.domain.ChatRoom;

public interface ChatRoomService {

	public void createRoom(String title, String userId);

	public boolean findByRoom(String title);

	public List<ChatRoom> findAll();

}
