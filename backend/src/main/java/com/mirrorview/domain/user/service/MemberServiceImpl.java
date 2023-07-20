package com.mirrorview.domain.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberRepository memberRepository;
	// private final PasswordEncoder passwordEncoder;

	@Override
	public boolean duplicatedUserId(String userid) {
		if(memberRepository.existsByUserId(userid)){
			return false;
		}
		return true;
	}

	@Override
	public void save(JoinDto joinDto) {
		Member joinMember = Member.builder()
			.userId(joinDto.getEmail())
			.nickname(joinDto.getNickname())
			.email(joinDto.getEmail())
			// .password(passwordEncoder.encode(joinDto.getPassword()))
			.build();

		memberRepository.save(joinMember);
	}
}
