package com.mirrorview.domain.chatroom.repository;

import org.springframework.data.repository.CrudRepository;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;

public interface ChatRepository extends CrudRepository<ChatRoom, String> {
}
