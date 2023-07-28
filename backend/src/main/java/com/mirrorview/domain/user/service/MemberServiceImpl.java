package com.mirrorview.domain.user.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.domain.Rating;
import com.mirrorview.domain.user.dto.FindMemberRequestDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.dto.RatingDto;
import com.mirrorview.domain.user.repository.MemberRepository;
import com.mirrorview.domain.user.repository.RatingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;

	private final PasswordEncoder passwordEncoder;

	private final RatingRepository ratingRepository;

	@Override
	public boolean duplicatedUserId(String userId) {
		return memberRepository.existsByUserId(userId);
	}

	@Override
	public void save(JoinDto joinDto) {
		if (duplicatedUserId(joinDto.getUserId())) {
			throw new IllegalArgumentException("아이디 확인이 필요합니다.");
		}

		String encoded = passwordEncoder.encode(joinDto.getPassword());
		joinDto.setPassword(encoded);
		Member joinMember = joinDto.toEntity();

		memberRepository.save(joinMember);
	}

	@Override
	public Member findByUserId(String userId) {
		return memberRepository.findByUserId(userId);
	}

	@Override
	public String findByEmail(String email) {
		Optional<Member> findMemberByEmail = memberRepository.findByEmail(email);
		return findMemberByEmail.map(member -> member.getUserId() + "***")
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));
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

		Member member = memberRepository.findByUserId(userId);
		Member otherMember = memberRepository.findByUserId(ratingDto.getUserId());
		if (member == null || otherMember == null) {
			throw new IllegalArgumentException("존재하지 않는 유저입니다.");
		}
		Rating newRating = Rating.builder()
			.rater(member)
			.rated(otherMember)
			.score(ratingDto.getScore())
			.build();
		ratingRepository.save(newRating);

		long count = findCount(otherMember);
		System.out.println(count);
		otherMember.updateAverageScore(count, newRating.getScore());

		return otherMember.getAverageRating();
	}

	private long findCount(Member otherMember) {
		return ratingRepository.findCount(otherMember);
	}

	@Override
	public boolean duplicatedNickname(String nickname) {
		return memberRepository.existsByNickname(nickname);
	}
}
