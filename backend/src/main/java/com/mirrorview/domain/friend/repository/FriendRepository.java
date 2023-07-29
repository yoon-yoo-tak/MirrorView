package com.mirrorview.domain.friend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.friend.domain.Friend;
import com.mirrorview.domain.user.domain.Member;

public interface FriendRepository extends JpaRepository<Friend, Long>, FriendRepositoryCustom {
	void deleteByFromOrTo(Member from,Member to);
}
