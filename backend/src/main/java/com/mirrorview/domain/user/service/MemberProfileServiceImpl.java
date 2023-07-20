package com.mirrorview.domain.user.service;

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
}
