package com.mirrorview.domain.friend.repository;

import com.mirrorview.domain.friend.domain.Friend;
import com.mirrorview.domain.friend.dto.FriendDto;

import java.util.List;
import java.util.Optional;

public interface FriendRepositoryCustom {

    List<FriendDto> findFriendsByUserId(String userId);

    List<FriendDto> findFriendRequestsByUserId(String userId);

    List<FriendDto> findSentFriendRequestsByUserId(String userId);

    String findFriendStatusByUserIds(String myUserId, String otherUserId);

    Optional<Friend> findByUserIds(String myUserId, String otherUserId);
}
