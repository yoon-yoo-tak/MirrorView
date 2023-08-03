package com.mirrorview.domain.chatroom.service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;

import java.util.List;
import java.util.Set;

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

    String userInRoom(String userId);

    void userInRoomSet(String userId, String roomId);

    void incrementUserCount(String userid);

    void decrementUserCount(String userid);

    long totalUserCount();

    void incrementRoomCount(String userId, String roomId);

    void decrementRoomCount(String userId, String roomId);

}