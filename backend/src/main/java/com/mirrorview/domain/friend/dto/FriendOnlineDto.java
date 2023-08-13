package com.mirrorview.domain.friend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FriendOnlineDto {
	private Long id;
	private String userId;
	private String nickname;
	private boolean online;
}