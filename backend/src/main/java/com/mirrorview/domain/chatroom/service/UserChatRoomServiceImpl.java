package com.mirrorview.domain.chatroom.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.repository.UserChatRoomRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserChatRoomServiceImpl implements UserChatRoomService {

	UserChatRoomRepository userChatRoomRepository;
	MemberRepository memberRepository;

	@Override
	public List<ChatRoom> findByUserChatRoom(String username) {
		Member member = memberRepository.findByUserId(username);
		return userChatRoomRepository.findChatRoomsByUserId(member.getId());
	}
}
