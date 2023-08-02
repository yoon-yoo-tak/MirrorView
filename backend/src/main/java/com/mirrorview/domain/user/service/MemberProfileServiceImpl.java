package com.mirrorview.domain.user.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.ChangePasswordDto;
import com.mirrorview.domain.user.dto.MemberProfileDto;
import com.mirrorview.domain.user.repository.MemberProfileRepository;
import com.mirrorview.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberProfileServiceImpl implements MemberProfileService {

	private final MemberProfileRepository memberProfileRepository;
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

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

	@Override
	public MemberProfileDto findByUserId(String userId) {
		Member member = memberProfileRepository.findByUserId(userId);
		MemberProfileDto memberProfileDto = new MemberProfileDto();
		memberProfileDto.setUserId(member.getUserId());
		memberProfileDto.setEmail(member.getEmail());
		memberProfileDto.setNickname(member.getNickname());
		memberProfileDto.setPhoto(member.getPhoto());
		memberProfileDto.setRoles(member.getRoles().replace("ROLE_", ""));
		memberProfileDto.setAverageRating(member.getAverageRating());
		return memberProfileDto;
	}

	@Override
	public void changePassword(ChangePasswordDto dto, String userId) {
		String origin = dto.getOriginPass();
		Member members = memberRepository.findByUserId(userId);
		if (passwordEncoder.matches(origin, members.getPassword())) {
			members.updatePassword(passwordEncoder.encode(dto.getNewPass()));
		}
	}

	@Override
	public void changeEmail(String email, String userId) {
		Member members = memberRepository.findByUserId(userId);
		members.updateEmail(email);
	}
}
