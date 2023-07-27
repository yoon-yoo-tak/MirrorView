package com.mirrorview.domain.interview.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RoomMemberInfo {

	private String nickname;
	private boolean ready;
}
