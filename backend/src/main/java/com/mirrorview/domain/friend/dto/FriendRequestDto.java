package com.mirrorview.domain.friend.dto;

import com.mirrorview.domain.friend.domain.Friend;
import com.mirrorview.domain.user.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class FriendRequestDto {
	private Member fromMember;
	private Member toMember;
	private Boolean isConnected;

	public Friend toEntity() {
		return Friend.builder()
			.from(fromMember)
			.to(toMember)
			.isConnected(isConnected)
			.build();
	}
}
