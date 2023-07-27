package com.mirrorview.domain.friend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mirrorview.domain.friend.domain.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long>, FriendRepositoryCustom {
}
