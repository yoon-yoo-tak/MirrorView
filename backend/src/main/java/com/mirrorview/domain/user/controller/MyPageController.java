package com.mirrorview.domain.user.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.essay.domain.Essay;
import com.mirrorview.domain.essay.domain.EssayDetail;
import com.mirrorview.domain.essay.service.EssayDetailService;
import com.mirrorview.domain.essay.service.EssayService;
import com.mirrorview.domain.feedback.domain.Feedback;
import com.mirrorview.domain.feedback.dto.FeedbackDto;
import com.mirrorview.domain.feedback.service.FeedbackService;
import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.service.MemberProfileService;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.response.BaseResponse;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
@Api(tags = "마이페이지")
public class MyPageController {

	private final MemberProfileService memberProfileService;
	private final FeedbackService feedbackService;

	@PatchMapping("/image")
	public ResponseEntity<?> updateImage(String userId, String photo) {
		memberProfileService.updatePhoto(userId, photo);
		return BaseResponse.ok(HttpStatus.OK, "프로필 사진 수정 완료");
	}

	@PatchMapping("/nickname")
	public ResponseEntity<?> updateNickname(String userId, String nickname) {
		try {
			memberProfileService.updateNickname(userId, nickname);
		} catch (IllegalArgumentException e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "닉네임 변경 완료");
	}

	@GetMapping("/feedbacks/{roomId}")
	public ResponseEntity<?> showFeedbacks(@PathVariable("roomId") Long roomId) {
		List<FeedbackDto> list = feedbackService.findFeedbackByRoomId(roomId);
		return BaseResponse.okWithData(HttpStatus.OK, "방별 피드백 불러오기 성공", list);
	}

	@DeleteMapping("/feedbacks/{feedbackid}")
	public ResponseEntity<?> deleteFeedbacks() {
		return null;
	}

	@GetMapping("/feedbacks/feedback/{feedbackId}")
	public ResponseEntity<?> detailFeedback(@PathVariable("feedbackId") Long feedbackId) {
		FeedbackDto data = feedbackService.findFeedbackByFeedbackId(feedbackId);
		return BaseResponse.okWithData(HttpStatus.OK, "피드백 단건 조회 성공", data);
	}

	@GetMapping("/feedbacks")
	public ResponseEntity<?> listFeedbacks(String userId) {
		String test = "test";
		List<FeedbackDto> list = feedbackService.findFeedbackByUserId(test);
		return BaseResponse.okWithData(HttpStatus.OK, "피드백 불러오기 성공", list);
	}

	@PutMapping("/essays")
	public ResponseEntity<?> updateEssays() {
		return null;
	}

	@PostMapping("/essays")
	public ResponseEntity<?> createEssays() {
		return null;
	}

	@GetMapping("/essays")
	public ResponseEntity<?> showEssays() {
		return null;
	}

	@GetMapping("/essays/{essay-id}")
	public ResponseEntity<?> detailEssays() {
		return null;
	}

	@DeleteMapping("/essays/{essay-id}")
	public ResponseEntity<?> deleteEssays() {
		return null;
	}
}
