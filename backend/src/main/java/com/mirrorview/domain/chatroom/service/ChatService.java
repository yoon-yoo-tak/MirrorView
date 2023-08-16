package com.mirrorview.domain.chatroom.service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;

import java.util.List;
import java.util.Set;

public interface ChatService {

    List<ChatRoom> allRoom();

    ChatRoom createChatRoom(String roomId);

    ChatRoom addChatMessageToChatRoom(String roomId, ChatMessage chatMessage);

    List<ChatMessage> getChat(String roomId);

}