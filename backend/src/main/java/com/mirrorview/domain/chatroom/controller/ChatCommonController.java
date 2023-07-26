package com.mirrorview.domain.chatroom.controller;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.mirrorview.domain.chatroom.service.ChatCommonServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatCommonController {

	private final ChatCommonServiceImpl chatCommonService;

	@GetMapping("/api/chats/users-count")
	public ResponseEntity getUserCount() {
		int count = chatCommonService.getUserCount();
		return ResponseEntity.ok(count);
	}

	@GetMapping("/api/chats/users")
	public ResponseEntity<?> getUserNames() {
		return ResponseEntity.ok(chatCommonService.getUserNames());
	}
}