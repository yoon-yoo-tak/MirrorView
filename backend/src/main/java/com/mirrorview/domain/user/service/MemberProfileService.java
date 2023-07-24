package com.mirrorview.domain.user.service;

public interface MemberProfileService {

	void updatePhoto(String userId, String photo);
	void updateNickname(String userId, String nickName);
}
