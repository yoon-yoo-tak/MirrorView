package com.mirrorview.domain.user.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.friend.service.FriendService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.dto.FindMemberRequestDto;
import com.mirrorview.domain.user.dto.JoinDto;
import com.mirrorview.domain.user.dto.MemberResDto;
import com.mirrorview.domain.user.dto.RatingDto;
import com.mirrorview.domain.user.service.EmailService;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;
	private final EmailService emailService;
	private final FriendService friendService;

	@PostMapping
	public ResponseEntity<?> join(@RequestBody JoinDto joinDto) {
		try {
			// emailService.checkEmail(joinDto.getEmail());
			memberService.save(joinDto);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
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

	@GetMapping("/{nickname}/check-nickname")
	public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
		try {
			boolean isDuplicated = memberService.duplicatedNickname(nickname);
			if (isDuplicated) {
				throw new IllegalArgumentException("중복된 닉네임 입니다.");
			}
		} catch (IllegalArgumentException e) {
			return BaseResponse.fail(e.getMessage(), 400);
		} catch (Exception e) {
			return BaseResponse.fail("서버에러", 500);
		}
		return BaseResponse.ok(HttpStatus.OK, "사용 가능한 닉네임입니다.");
	}

	@GetMapping("/find/id")
	public ResponseEntity<?> findUserId(@RequestBody FindMemberRequestDto requestDto) {
		System.out.println("requestDto.getEmail() = " + requestDto.getEmail());
		if (requestDto == null || requestDto.isBlankEmail()) {
			return BaseResponse.fail("잘못된 데이터 형식입니다.", 500);
		}
		String findUserId;
		try {
			findUserId = memberService.findByEmail(requestDto.getEmail());
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.okWithData(HttpStatus.OK, "사용자 아이디 조회 완료", findUserId);
	}

	@GetMapping("/find/password")
	public ResponseEntity<?> findPassword(@RequestBody FindMemberRequestDto requestDto) {
		//todo email html 문장 변형하기

		if (requestDto == null || requestDto.isBlankEmailAndUserId()) {
			return BaseResponse.fail("잘못된 데이터 형식입니다.", 500);
		}
		try {
			Member findMember = memberService.findPassword(requestDto);
			emailService.sendEmail(findMember);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "이메일 전송 완료");
	}

	@PostMapping("/rating/save")
	public ResponseEntity<?> saveRating(@AuthenticationPrincipal CustomMemberDetails member,
		@RequestBody RatingDto ratingDto) {
		float currentScore;
		try {
			String userId = member.getUsername();
			if (userId.equals(ratingDto.getUserId())) {
				return BaseResponse.fail("나는 나를 평가 할 수 없다.", 500);
			}
			currentScore = memberService.saveScore(userId, ratingDto);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.okWithData(HttpStatus.OK, "평점 남기기 완료", currentScore);
	}

	@GetMapping("/find/{userId}")
	public ResponseEntity<?> getOtherMemberInfo(@PathVariable String userId,
		@AuthenticationPrincipal CustomMemberDetails member) {
		String myUserId = member.getUsername();
		if (myUserId.equals(userId)) {
			return BaseResponse.fail("잘못된 정보", 400);
		}
		Optional<Member> findMember = memberService.findByUserId(userId);
		if (findMember.isEmpty() || findMember.get().getDelete()) {
			return BaseResponse.fail("없는 정보입니다.", 400);
		}
		String friendStatus = friendService.getFriendStatus(myUserId, userId);
		MemberResDto responseDto = MemberResDto.build(friendStatus, findMember.get());

		return BaseResponse.okWithData(HttpStatus.OK, "상대 정보 열람", responseDto);
	}

	@GetMapping("/findAll/{input}")
	public ResponseEntity<?> getMemberList(@PathVariable String input) {
		return BaseResponse.okWithData(HttpStatus.OK, "유저 리스트", memberService.findMemberList(input));
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable String userId) {
		try {

			memberService.deleteMember(userId);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 500);
		}
		return BaseResponse.ok(HttpStatus.OK, "삭제 완료");
	}
}
