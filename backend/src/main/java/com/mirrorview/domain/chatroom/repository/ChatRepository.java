package com.mirrorview.domain.chatroom.repository;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import org.springframework.data.repository.CrudRepository;

public interface ChatRepository extends CrudRepository<ChatRoom, String> {
}
