package com.mirrorview.domain.chatroom.service;

import java.util.List;

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
public class UserChatRoomServiceImpl implements UserChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final UserChatRoomRepository userChatRoomRepository;
	private final MemberRepository memberRepository;

	@Override
	public List<ChatRoom> findByUserChatRoom(String username) {
		System.out.println(username);
		Member member = memberRepository.findByUserId(username);
		return userChatRoomRepository.findChatRoomsByUserId(member.getId());
	}

	@Override
	public void joinChatRoom(String username, String room) {
		Member member = memberRepository.findByUserId(username);
		ChatRoom chatRoom = chatRoomRepository.findByTitle(room).get();

		UserChatRoom userChatRoom = UserChatRoom.builder()
			.member(member)
			.chatroom(chatRoom)
			.build();

		userChatRoomRepository.save(userChatRoom);
	}

	@Override
	public void quitChatRoom(String username, String room) {
		Member member = memberRepository.findByUserId(username);
		ChatRoom chatRoom = chatRoomRepository.findByTitle(room).get();

		userChatRoomRepository.deleteUserChatRoomByMemberAndChatroom(member.getId(), chatRoom.getId());
	}
}
