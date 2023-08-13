package com.mirrorview.domain.user.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.friend.repository.FriendRepository;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.domain.Rating;
import com.mirrorview.domain.user.dto.FindMemberRequestDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.dto.RatingDto;
import com.mirrorview.domain.user.dto.SearchedMemberDto;
import com.mirrorview.domain.user.repository.MemberRepository;
import com.mirrorview.domain.user.repository.RatingRepository;
import com.mirrorview.global.alarm.domain.RealTimeUser;
import com.mirrorview.global.alarm.repository.RealTimeUserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RatingRepository ratingRepository;
    private final FriendRepository friendRepository;
    private final RealTimeUserRepository realTimeUserRepository;

    @Override
    public boolean duplicatedUserId(String userId) {
        return memberRepository.existsByUserId(userId);
    }

    @Override
    public void save(JoinDto joinDto) {
        if (duplicatedUserId(joinDto.getUserId())) {
            throw new IllegalArgumentException("아이디 확인이 필요합니다.");
        }

        Member joinMember;
        if (joinDto.getPassword() != null) { //일반 로그인
            String encoded = passwordEncoder.encode(joinDto.getPassword());
            joinDto.setPassword(encoded);
            joinMember = joinDto.toEntity();
        } else { //OAuth 로그인
            joinMember = joinDto.toEntityWithPhoto();
        }

        memberRepository.save(joinMember);
    }

    @Override
    public Optional<Member> findByUserId(String userId) {
        return memberRepository.findByUserId(userId);
    }

    @Override
    public String findByEmail(String email) {
        Optional<Member> findMemberByEmail = memberRepository.findByEmail(email);
        return findMemberByEmail.map(member -> maskString(member.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));
    }

    @Override
    public Optional<Member> findByNickname(String userNickname) {
        return memberRepository.findByNickname(userNickname);
    }

    @Override
    public Member findPassword(FindMemberRequestDto requestDto) {
        Optional<Member> findMember = memberRepository.findByEmailAndUserId(requestDto.getEmail(),
                requestDto.getUserId());
        if (findMember.isEmpty()) {
            throw new IllegalArgumentException("일치하는 계정이 존재하지 않습니다.");
        }
        return findMember.get();
    }

    @Override
    @Transactional
    public float saveScore(String userId, RatingDto ratingDto) {

        Optional<Member> member = memberRepository.findByUserId(userId);
        Optional<Member> otherMember = memberRepository.findByNickname(ratingDto.getNickname());
        if (member.isEmpty() || otherMember.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 유저입니다.");
        }
        Rating newRating = Rating.builder()
                .rater(member.get())
                .rated(otherMember.get())
                .score(ratingDto.getScore())
                .build();
        ratingRepository.save(newRating);

        long count = findCount(otherMember.get());
        System.out.println(count);
        otherMember.get().updateAverageScore(count, newRating.getScore());

        return otherMember.get().getAverageRating();
    }

    @Override
    public Set<SearchedMemberDto> findMemberList(String input) {
        Set<SearchedMemberDto> result = new HashSet<>();
        realTimeUserRepository.findAll()
            .stream()
            .filter(member -> member.getNickname().contains(input))
            .map(RealTimeUser::toSearchedMemberDtos)
            .forEach((member) -> result.add(member));
        log.info("first logic");
        for (SearchedMemberDto dtos : result) {
            log.info("dto = {}", dtos);
        }

        memberRepository.findByNicknameContaining(input)
                .stream()
                .filter(member -> !member.getDelete())
                .map(member -> SearchedMemberDto.builder()
                        .userId(member.getUserId())
                        .nickname(member.getNickname())
                        .build())
                .forEach((member) -> result.add(member));
        log.info("second logic");
        for (SearchedMemberDto dtos : result) {
            log.info("dtos = {}", dtos);
        }
        return result;
    }

    @Override
    @Transactional
    public void deleteMember(String userId) {

        Optional<Member> member = memberRepository.findByUserId(userId);
        if (member.isEmpty() || member.get().getDelete()) {
            throw new IllegalArgumentException("잘못된 정보");
        }
        Member getMember = member.get();
        getMember.delete();
        friendRepository.deleteByFromOrTo(getMember, getMember);
    }

    private long findCount(Member otherMember) {
        return ratingRepository.findCount(otherMember);
    }

    @Override
    public boolean duplicatedNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    private String maskString(String str) {
        int numCharsToMask = str.length() / 3;
        if (str == null || str.length() <= numCharsToMask) {
            return str;
        }

        String mask = "*".repeat(numCharsToMask); // 나머지 길이만큼 "*"로 채움
        return str.substring(0, str.length() - numCharsToMask) + mask;
    }
}
