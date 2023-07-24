package com.mirrorview.domain.chatroom.service;

import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.domain.UserChatRoom;
import com.mirrorview.domain.chatroom.repository.ChatRoomRepository;
import com.mirrorview.domain.chatroom.repository.UserChatRoomRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

	ChatRoomRepository chatRoomRepository;
	MemberRepository memberRepository;
	UserChatRoomRepository userChatRoomRepository;

	@Override
	public void createRoom(String title, String userId) {
		Member member = memberRepository.findByUserId(userId);
		ChatRoom chatRoom = ChatRoom.builder().title(title).build();
		UserChatRoom userChatRoom = UserChatRoom.builder().chatroom(chatRoom).member(member).build();
		userChatRoomRepository.save(userChatRoom);
	}

	@Override
	public boolean findByRoom(String title) {
		Optional<ChatRoom> chatRoom = chatRoomRepository.findByTitle(title);
		if (chatRoom.isPresent())
			throw new DataIntegrityViolationException("이미 채팅방 이름이 사용중 입니다.");
		return true;
	}
}
