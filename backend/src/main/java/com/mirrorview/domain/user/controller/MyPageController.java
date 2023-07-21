package com.mirrorview.domain.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.user.service.MemberProfileService;
import com.mirrorview.global.response.BaseResponse;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
@Api(tags = "마이페이지")
public class MyPageController {

	private final MemberProfileService memberProfileService;

	@PatchMapping("/image")
	public ResponseEntity<?> updateImage(String userId, String photo){
		memberProfileService.updatePhoto(userId, photo);
		return BaseResponse.ok(HttpStatus.OK, "프로필 사진 수정 완료");
	}


	@PatchMapping("/nickname")
	public ResponseEntity<?> updateNickname(String userId, String nickname){
		try {
			memberProfileService.updateNickname(userId, nickname);
		}catch (IllegalArgumentException e){
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "닉네임 변경 완료");
	}

	@GetMapping("/feedbacks&roomid={roomid}")
	public ResponseEntity<?> showFeedbacks(){
		return null;
	}

	@DeleteMapping("/feedbacks/{feedbackid}")
	public ResponseEntity<?> deleteFeedbacks(){
		return null;
	}


	@GetMapping("/feedbacks?feedbackid={feedbackid}")
	public ResponseEntity<?> detailFeedback(){
		return null;
	}

	@GetMapping("/feedbacks")
	public ResponseEntity<?> listFeedbacks(){
		return null;
	}




	@PutMapping("/essays")
	public ResponseEntity<?> updateEssays(){
		return null;
	}

	@PostMapping("/essays")
	public ResponseEntity<?> createEssays(){
		return null;
	}

	@GetMapping("/essays")
	public ResponseEntity<?> showEssays(){
		return null;
	}

	@GetMapping("/essays/{essay-id}")
	public ResponseEntity<?> detailEssays(){
		return null;
	}

	@DeleteMapping("/essays/{essay-id}")
	public ResponseEntity<?> deleteEssays(){
		return null;
	}
}
