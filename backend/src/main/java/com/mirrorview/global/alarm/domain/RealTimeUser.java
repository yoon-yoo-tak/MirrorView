package com.mirrorview.global.alarm.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import com.mirrorview.domain.user.dto.SearchedMemberDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@RedisHash("online")
public class RealTimeUser {

	@Id
	private String nickname;

	private String userId;

	public SearchedMemberDto toSearchedMemberDtos() {
		return new SearchedMemberDto(this.nickname, this.userId, true);
	}
}
