package com.mirrorview.domain.friend.repository;

import java.util.List;
import java.util.Optional;

import com.mirrorview.domain.friend.domain.Friend;
import com.mirrorview.domain.friend.dto.FriendDto;

public interface FriendRepositoryCustom {

	List<FriendDto> findFriendsByUserId(String userId);

	List<FriendDto> findFriendRequestsByUserId(String userId);

	String findFriendStatusByUserIds(String myUserId, String otherUserId);

	Optional<Friend> findByUserIds(String myUserId, String otherUserId);
}
