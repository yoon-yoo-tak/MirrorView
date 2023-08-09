package com.mirrorview.domain.admin.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mirrorview.domain.admin.dto.ReportDetailDto;
import com.mirrorview.domain.admin.dto.ReportListDto;
import com.mirrorview.domain.admin.service.ReportService;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@Secured("ROLE_ADMIN")
public class ReportManageController {

	private final ReportService reportService;

	@GetMapping
	public ResponseEntity<?> getReportList(){
		List<ReportListDto> list = reportService.getList();
		return BaseResponse.okWithData(HttpStatus.OK, "리폿 조회 성공", list);
	}

	@GetMapping("/{nickname}")
	public ResponseEntity<?> getReportContent(@PathVariable("nickname") String nickname){
		List<ReportDetailDto> list = reportService.getContent(nickname);
		return BaseResponse.okWithData(HttpStatus.OK, "신고내역 조회 성공", list);
	}

	@DeleteMapping("/{nickname}")
	public ResponseEntity<?> banUser(@PathVariable("nickname") String nickname){
		try{
			reportService.banMember(nickname);
			return BaseResponse.ok(HttpStatus.OK, "벤 완료");
		}catch (Exception e){
			return BaseResponse.fail("벤 실패", 400);
		}

	}
}
