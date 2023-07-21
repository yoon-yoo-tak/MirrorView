package com.mirrorview.domain.user.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberProfileServiceImpl implements MemberProfileService{

	private final MemberProfileRepository memberProfileRepository;

	@Override
	public void updatePhoto(String userId, String photo) {
		Member member = memberProfileRepository.findByUserId(userId);
		member.updatePhoto(photo);
	}

	@Override
	public void updateNickname(String userId, String nickName) {
		Optional<Member> findMember = memberProfileRepository.findByNickname(nickName);
		if (findMember.isPresent()) { // nickName을 가진 유저가 존재
			throw new IllegalArgumentException("이미 존재하는 닉네임");
		}// nickName을 가진 유저 없음
		Member member = memberProfileRepository.findByUserId(userId);
		member.updateNickName(nickName);

	}
}
