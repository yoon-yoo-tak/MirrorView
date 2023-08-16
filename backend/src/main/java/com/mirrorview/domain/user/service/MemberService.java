package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.FindMemberRequestDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.dto.RatingDto;
import com.mirrorview.domain.user.dto.SearchedMemberDto;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberService {
	boolean duplicatedUserId(String userid);

	void save(JoinDto joinDto);

	boolean duplicatedNickname(String nickname);

	Optional<Member> findByUserId(String userId);

	String findByEmail(String email);

	Optional<Member> findByNickname(String userNickname);

	Member findPassword(FindMemberRequestDto requestDto);

	float saveScore(String userId, RatingDto ratingDto);

	Set<SearchedMemberDto> findMemberList(String input);

	void deleteMember(String userId);
}
