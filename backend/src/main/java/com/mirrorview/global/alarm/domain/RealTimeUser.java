package com.mirrorview.global.alarm.domain;

import com.mirrorview.domain.user.dto.SearchedMemberDto;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@RedisHash("online")
public class RealTimeUser {

	@Id
	private String nickname;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		RealTimeUser that = (RealTimeUser) o;
		return Objects.equals(nickname, that.nickname);
	}

	@Override
	public int hashCode() {
		return Objects.hash(nickname);
	}

	public SearchedMemberDto toSearchedMemberDtos() {
		return new SearchedMemberDto(this.nickname, true);
	}
}
