package com.mirrorview.domain.user.dto;

import com.mirrorview.domain.user.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JoinDto {

	private String userId;
	private String username;
	private String nickname;
	private String password;
	private String email;

	public Member toEntity() {
		return Member.builder()
			.userId(userId)
			.username(username)
			.nickname(nickname)
			.password(password)
			.email(email)
			.build();
	}
}
