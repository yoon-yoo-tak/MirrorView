package com.mirrorview.global.auth.controller;

import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.auth.jwt.JwtPayloadDto;
import com.mirrorview.global.auth.oauth.publickey.KakaoPublicKeyService;
import com.mirrorview.global.auth.oauth.publickey.PublicKeyRepository;
import com.mirrorview.global.response.BaseResponse;
import com.mirrorview.global.util.JwtOidcUtil;
import com.mirrorview.global.util.JwtTokenUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/users/login/kakao")
public class KakaoOidcController {
	private final KakaoPublicKeyService kakaoPublicKeyService;
	private final PublicKeyRepository publicKeyRepository;
	private final JwtOidcUtil jwtOidcUtil;
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder;
	private final RedisTemplate<String, String> template;

	/*
	TODO:
	 1. ID토큰을 Client에게 전달받는다
	 2. ID토큰 검증
	 3. 첫 OAuth 로그인이면 강제 회원가입 진행
	 4. Security ContextHolder 저장
	 5. ACCESS, REFRESH 토큰 발급
	 */
	@PostMapping
	public ResponseEntity<?> oidcLogin(@RequestHeader("Authorization") String idToken) {
		JwtPayloadDto memberData;
		try {
			memberData = jwtOidcUtil.decodeIdToken(idToken);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
		Optional<Member> optionalMember = memberService.findByUserId(memberData.getSub());
		JoinDto newMember;
		if (optionalMember.isEmpty()) {
			newMember = JoinDto.builder()
				.userId(memberData.getSub())
				.nickname(memberData.getNickname())
				.email(memberData.getEmail())
				.build();
			memberService.save(newMember);
			optionalMember = memberService.findByUserId(memberData.getSub());
		}

		String userId = optionalMember.get().getUserId();

		// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
		Map<String, String> tokens = new LinkedHashMap<>();
		tokens.put("access-token", JwtTokenUtil.getAccessToken(userId));
		tokens.put("refresh-token", JwtTokenUtil.getRefreshToken(userId));

		//Redis에 20일 동안 저장
		template.opsForValue().set("refresh " + userId, tokens.get("refresh-token"), Duration.ofDays(20));

		return BaseResponse.okWithData(HttpStatus.OK, "login Success", tokens);
	}
}
