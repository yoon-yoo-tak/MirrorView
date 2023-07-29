package com.mirrorview.domain.user.service;

import java.util.List;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.FindMemberRequestDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.dto.RatingDto;

public interface MemberService {
	boolean duplicatedUserId(String userid);

	void save(JoinDto joinDto);

	boolean duplicatedNickname(String nickname);

	Member findByUserId(String userId);

	String findByEmail(String email);

	Member findPassword(FindMemberRequestDto requestDto);

	float saveScore(String username, RatingDto ratingDto);

	List<String> findMemberList(String userId);

	void deleteMember(String userId);
}
