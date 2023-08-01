package com.mirrorview.global.auth.jwt;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.service.MemberService;

import lombok.RequiredArgsConstructor;

/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
@RequiredArgsConstructor
public class CustomMemberDetailService implements UserDetailsService {

	private final MemberService memberService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Member> optionalMember = memberService.findByUserId(username);
		if (optionalMember.isPresent()) {
			CustomMemberDetails userDetails = new CustomMemberDetails(optionalMember.get());
			return userDetails;
		}
		return null;
	}
}
