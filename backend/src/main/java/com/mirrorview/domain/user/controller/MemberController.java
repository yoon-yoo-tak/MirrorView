package com.mirrorview.domain.user.controller;

import java.util.Map;

import org.apache.catalina.util.ParameterMap;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.user.dto.EmailKeyDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.response.BaseResponse;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@PostMapping
	public ResponseEntity<?> join(@RequestBody JoinDto joinDto, HttpEntity<String> httpEntity) {
		String body = httpEntity.getBody();
		System.out.println(body);
		//todo check되어있는지 확인하기
		// memberService.save(joinDto);
		System.out.println(joinDto.getEmail());
		return BaseResponse.okWithData(HttpStatus.OK,"회원가입 완료",joinDto);
	}

	@GetMapping("/{userid}/check-id")
	public ResponseEntity<?> checkUserid(@PathVariable String userid) {
		boolean checkUserId = memberService.duplicatedUserId(userid);
		if (!checkUserId) {
			return BaseResponse.fail("사용할 수 없는 아이디입니다",400);
		}
		return BaseResponse.ok(HttpStatus.OK,"사용가능한 아이디입니다.");
	}

	@PostMapping("/{email}")
	public ResponseEntity<?> checkEmailKey(@PathVariable String email,  @RequestBody EmailKeyDto emailKey) {
		//todo email과 암호 디비 일치 체크
		System.out.println(emailKey.getKey());
		// if (rm.get("key").equals("1234")) {
		// 	return BaseResponse.ok(HttpStatus.OK, "암호 확인 완료");
		// }

		return BaseResponse.fail("재확인 필요", 400);
	}
	@GetMapping("/{email}")
	public ResponseEntity<?> sendEmailKey(@PathVariable String email) {

		//todo  email 전송 구현하기

		return BaseResponse.okWithData(HttpStatus.OK, "이메일 전송이 완료되었습니다.",email);
	}



}
