package com.mirrorview.domain.essay.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.essay.dto.EssayListDto;
import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/essays")
@RequiredArgsConstructor
@Slf4j
public class EssayController {

	private final InterviewService interviewService;

	@GetMapping
	public ResponseEntity<?> fetchEssays(@AuthenticationPrincipal CustomMemberDetails customMemberDetails){
		List<EssayListDto> essayListDtos = interviewService.getEssayListDtos(customMemberDetails.getUsername());
		return BaseResponse.okWithData(HttpStatus.OK, "유저의 모든 에세이", essayListDtos);
	}
}
