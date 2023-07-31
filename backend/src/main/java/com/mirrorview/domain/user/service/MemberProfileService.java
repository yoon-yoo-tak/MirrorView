package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.dto.ChangePasswordDto;
import com.mirrorview.domain.user.dto.MemberProfileDto;

public interface MemberProfileService {

	void updatePhoto(String userId, String photo);
	void updateNickname(String userId, String nickName);
	MemberProfileDto findByUserId(String userId);
	void changePassword(ChangePasswordDto dto, String userId);
}
