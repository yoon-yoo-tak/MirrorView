package com.mirrorview.domain.interview.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.interview.service.InterviewService;
import com.mirrorview.global.response.BaseResponse;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@Api(value = "Interview", tags = {"InterView Controller"})
@RequestMapping("/api/interviews")
public class InterviewController {

	private final InterviewService interviewService;

	@GetMapping("/rooms")
	public ResponseEntity<?> getRooms() {
		return BaseResponse.okWithData(HttpStatus.OK, "방 정보 조회 완료", interviewService.findRoom());
	}
}
