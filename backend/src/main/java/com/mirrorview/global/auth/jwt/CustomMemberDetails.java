package com.mirrorview.global.auth.jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.mirrorview.domain.user.domain.Member;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 부가 상세정보(활성화 여부, 만료, 롤 등) 정의.
 */
@NoArgsConstructor
@AllArgsConstructor
public class CustomMemberDetails implements UserDetails {
	boolean accountNonExpired;
	boolean accountNonLocked;
	boolean credentialNonExpired;
	boolean enabled = false;
	List<GrantedAuthority> roles = new ArrayList<>();
	private Member member;

	public CustomMemberDetails(Member member) {
		super();
		this.member = member;
		this.roles = new ArrayList<>(); //
	}

	public Member getUser() {
		return this.member;
	}

	@Override
	public String getPassword() {
		return this.member.getPassword();
	}

	@Override
	public String getUsername() {
		return this.member.getUserId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}

	public void setAuthorities(List<GrantedAuthority> roles) {
		this.roles = roles;
	}

	public String getNickname() {
		return this.member.getNickname();
	}
}
