package com.mirrorview.domain.user.dto;

import com.mirrorview.domain.user.domain.Member;

import lombok.*;

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
	private String photo;

	public Member toEntity() {
		return Member.builder()
			.userId(userId)
			.username(username)
			.nickname(nickname)
			.password(password)
			.email(email)
			.photo("https://mirror-view.s3.ap-northeast-2.amazonaws.com/defaultimage.png")
			.roles("ROLE_USER")
			.delete(false)
			.build();
	}

	public Member toEntityWithPhoto() {
		return Member.builder()
				.userId(userId)
				.username(username)
				.nickname(nickname)
				.password(password)
				.email(email)
				.photo(photo)
				.roles("ROLE_USER")
				.delete(false)
				.build();
	}
}
