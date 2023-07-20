package com.mirrorview.domain.user.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.service.EmailService;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final EmailService emailService;

	@PostMapping
	public ResponseEntity<?> join(@RequestBody JoinDto joinDto) {
		//todo check되어있는지 확인하기
		try {
			memberService.save(joinDto);
		} catch (Exception e) {
			return BaseResponse.fail("회원가입 실패", 400);
		}
		return BaseResponse.okWithData(HttpStatus.OK, "회원가입 완료", joinDto);
	}

	@GetMapping("/{userId}/check-id")
	public ResponseEntity<?> checkUserid(@PathVariable String userId) {
		boolean isDuplicatedMember = memberService.duplicatedUserId(userId);
		if (isDuplicatedMember) {
			return BaseResponse.fail("사용할 수 없는 아이디입니다", 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "사용가능한 아이디입니다.");
	}

	@PostMapping("/{email}")
	public ResponseEntity<?> checkEmailKey(@PathVariable String email, @RequestBody Map<String, String> map) {
		String key = map.getOrDefault("key", "empty");
		if (key.equals("empty")) {
			return BaseResponse.fail("클라이언트 서버 에러", 501);
		}
		boolean isChecked = emailService.checkKey(email, key);
		if (!isChecked) {
			return BaseResponse.fail("다시 입력해주세요.", 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "암호 확인 완료");
	}

	@GetMapping("/{email}")
	public ResponseEntity<?> sendEmailKey(@PathVariable String email) {
		boolean complete = emailService.sendEmail(email);
		if (complete) {
			return BaseResponse.okWithData(HttpStatus.OK, "이메일 전송이 완료되었습니다.", email);
		}
		return BaseResponse.fail("이메일 전송 오류", 500);
	}

}
