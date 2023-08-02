package com.mirrorview.domain.user.service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.FindMemberRequestDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.dto.RatingDto;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    boolean duplicatedUserId(String userid);

    void save(JoinDto joinDto);

    boolean duplicatedNickname(String nickname);

    Optional<Member> findByUserId(String userId);

    String findByEmail(String email);

    Member findPassword(FindMemberRequestDto requestDto);

    float saveScore(String userId, RatingDto ratingDto);

    List<String> findMemberList(String userId);
}
