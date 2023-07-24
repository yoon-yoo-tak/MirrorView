package com.mirrorview.global.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.LoginDto;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.response.BaseResponse;
import com.mirrorview.global.util.JwtTokenUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private final PasswordEncoder passwordEncoder;
	private final MemberService memberService;

	@GetMapping("/hello")
	public String hello() {
		String asd = "asdasd";
		String encode = passwordEncoder.encode(asd);
		return "Asd";
	}

	@PostMapping("/api/users/login")
	public ResponseEntity<?> signIn(@RequestBody LoginDto loginDto) {
		log.info("controller start");
		System.out.println("c S");
		String userId = loginDto.getUserId();
		String password = loginDto.getPassword();
		log.info("login start with id = {}, pw = {}", userId, password);

		Member member = memberService.findByUserId(userId);

		log.info("member founded = {}", member.toString());

		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (passwordEncoder.matches(password, member.getPassword())) {
			log.info("login ok!");
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return BaseResponse.okWithData(HttpStatus.OK, "login Success", JwtTokenUtil.getToken(userId));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return BaseResponse.fail("login fail", 401);
	}
}
