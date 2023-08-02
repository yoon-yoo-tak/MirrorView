package com.mirrorview.domain.friend.repository;

import com.mirrorview.domain.friend.domain.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long>, FriendRepositoryCustom {
}
