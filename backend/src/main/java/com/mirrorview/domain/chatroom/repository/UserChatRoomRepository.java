package com.mirrorview.domain.chatroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.domain.UserChatRoom;

public interface UserChatRoomRepository extends JpaRepository<UserChatRoom, Long> {

	@Query("SELECT ucr.chatroom FROM UserChatRoom ucr WHERE ucr.member.id = :memberId")
	List<ChatRoom> findChatRoomsByUserId(@Param("memberId") Long memberId);

	void deleteUserChatRoomByMemberAndChatroom(long MemberId, long chatRoomId);
}
