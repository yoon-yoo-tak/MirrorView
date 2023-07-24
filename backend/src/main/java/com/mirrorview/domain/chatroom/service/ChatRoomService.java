package com.mirrorview.domain.chatroom.service;

public interface ChatRoomService {

	public void createRoom(String title, String userId);

	public boolean findByRoom(String title);

}
