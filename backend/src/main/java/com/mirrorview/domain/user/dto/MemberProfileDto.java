package com.mirrorview.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
@NoArgsConstructor
public class MemberProfileDto {
	private String userId;
	private String nickname;
	private String email;
	private String photo;
	private String roles;
	private float averageRating;
}
