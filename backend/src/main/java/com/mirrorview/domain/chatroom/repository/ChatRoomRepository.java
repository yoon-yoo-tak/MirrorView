package com.mirrorview.domain.chatroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.chatroom.domain.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


}
