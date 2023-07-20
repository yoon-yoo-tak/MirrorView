package com.mirrorview.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberProfileDto {
	private String userId;
	private String password;
	private String nickname;
	private String email;
	private String photo;
}
