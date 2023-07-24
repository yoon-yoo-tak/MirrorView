package com.mirrorview.domain.chatroom.service;

import java.util.List;

import com.mirrorview.domain.chatroom.domain.ChatRoom;

public interface UserChatRoomService {

	List<ChatRoom> findByUserChatRoom(String username);

}
