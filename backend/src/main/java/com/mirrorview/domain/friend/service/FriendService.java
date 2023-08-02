package com.mirrorview.domain.friend.service;

import com.mirrorview.domain.friend.dto.FriendDto;

import java.util.List;

public interface FriendService {

    Boolean save(String myUserId, String otherUserId);

    Boolean delete(String myUserId, String otherUserId);

    void acceptRequest(String myUserId, String otherUerId);

    List<FriendDto> getFriends(String userId);

    List<FriendDto> getFriendRequests(String userId);

    List<FriendDto> getSentFriendRequests(String userId);

    String getFriendStatus(String myUserId, String otherUserId);
}
