package com.mirrorview.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordDto {
	private String originPass;
	private String newPass;
	private String checkNewPass;
}
