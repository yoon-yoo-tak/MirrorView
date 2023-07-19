package com.mirrorview.domain.chatroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.chatroom.domain.UserChatRoom;

public interface UserChatRoomRepository extends JpaRepository<UserChatRoom, Long> {


}
