package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.dto.JoinDto;

public interface MemberService {
	boolean duplicatedUserId(String userid);

	void save(JoinDto joinDto);
}
