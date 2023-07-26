package com.mirrorview.domain.admin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.admin.dto.ReportRequestDto;
import com.mirrorview.domain.admin.service.ReportService;
import com.mirrorview.global.auth.jwt.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class ReportController {

	private final ReportService reportService;

	@PostMapping("/report")
	public ResponseEntity<?> reportMember(@AuthenticationPrincipal CustomMemberDetails member,
		@RequestBody ReportRequestDto requestDto) {
		try {
			String userId = member.getUsername();
			if (userId.equals(requestDto.getOtherUserId())) {
				return BaseResponse.fail("본인 신고 안됨", 400);
			}
			reportService.reportMember(userId, requestDto);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}
		return BaseResponse.ok(HttpStatus.OK, "신고가 접수되었습니다");
	}

}
