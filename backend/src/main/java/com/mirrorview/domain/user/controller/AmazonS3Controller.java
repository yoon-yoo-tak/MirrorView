package com.mirrorview.domain.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mirrorview.domain.user.service.AwsS3Service;
import com.mirrorview.domain.user.service.MemberService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class AmazonS3Controller {
	private final AwsS3Service awsS3Service;
	private final MemberService memberService;

	@PostMapping("/image")
	public ResponseEntity<?> uploadImage(@RequestPart MultipartFile multipartFile, @AuthenticationPrincipal
		CustomMemberDetails member) {
		try {
			String fileName = awsS3Service.uploadProfileImage(multipartFile, member.getUsername());
			return BaseResponse.okWithData(HttpStatus.OK, "파일 업로드 성공", fileName);
		} catch (Exception e) {
			return BaseResponse.fail(e.getMessage(), 400);
		}

	}
}
