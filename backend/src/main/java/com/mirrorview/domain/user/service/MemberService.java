package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.JoinDto;

public interface MemberService {
	boolean duplicatedUserId(String userid);

	void save(JoinDto joinDto);

	boolean duplicatedNickname(String nickname);

	Member findByUserId(String userId);

	String findByEmail(String email);
}
