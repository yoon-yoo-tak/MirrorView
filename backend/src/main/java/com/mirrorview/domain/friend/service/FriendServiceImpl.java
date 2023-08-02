package com.mirrorview.domain.friend.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mirrorview.domain.friend.domain.Friend;
import com.mirrorview.domain.friend.dto.FriendDto;
import com.mirrorview.domain.friend.dto.FriendRequestDto;
import com.mirrorview.domain.friend.repository.FriendRepository;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FriendServiceImpl implements FriendService {

	private final FriendRepository friendRepository;
	private final MemberRepository memberRepository;
	private final EntityManager em;

	@Override
	public Boolean save(String myUserId, String otherUserId) {
		//이미 친구면 false 리턴
		if (isFriend(myUserId, otherUserId)) {
			return false;
		}
		FriendRequestDto friendRequestDto = FriendRequestDto.builder()
			.fromMember(memberRepository.findByUserId(myUserId))
			.toMember(memberRepository.findByUserId(otherUserId))
			.isConnected(false)
			.build();

		friendRepository.save(friendRequestDto.toEntity());
		return true;
	}

	@Override
	public Boolean delete(String myUserId, String otherUserId) {
		if (!isFriend(myUserId, otherUserId)) {
			return false;
		}
		Optional<Friend> byUserIds = friendRepository.findByUserIds(myUserId, otherUserId);
		friendRepository.delete(byUserIds.get());
		return true;
	}

	@Override
	@Transactional
	public void acceptRequest(String myUserId, String otherUerId) {
		Optional<Friend> byUserIds = friendRepository.findByUserIds(myUserId, otherUerId);
		Friend friend = byUserIds.orElseThrow(() -> new EntityNotFoundException("Friend not found"));
		friend.acceptFriend(); // 변경 메소드 호출
		friendRepository.save(friend);
	}

	private boolean isFriend(String myUserId, String otherUserId) {
		return !friendRepository.findFriendStatusByUserIds(myUserId, otherUserId).equals("none");
	}

	@Override
	public List<FriendDto> getFriends(String userId) {
		return friendRepository.findFriendsByUserId(userId);
	}

	@Override
	public List<FriendDto> getFriendRequests(String userId) {
		return friendRepository.findFriendRequestsByUserId(userId);
	}

	@Override
	public List<FriendDto> getSentFriendRequests(String userId) {
		return friendRepository.findSentFriendRequestsByUserId(userId);
	}

	@Override
	public String getFriendStatus(String myUserId, String otherUserId) {
		return friendRepository.findFriendStatusByUserIds(myUserId, otherUserId);
	}
}
