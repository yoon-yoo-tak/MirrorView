package com.mirrorview.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindMemberRequestDto {

	private String email;
	private String userId;
	private String password;

	public boolean isBlankEmail() {
		return this.email == null || this.email.isBlank();
	}

	public boolean isBlankEmailAndUserId() {
		return this.isBlankEmail() || this.userId == null || this.userId.isBlank();
	}
}
