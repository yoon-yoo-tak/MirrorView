package com.mirrorview.global.alarm.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.global.alarm.dto.GlobalMessageDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
	기능 :
	현재 실시간 접속 유저
	알람 (친구 요청, 친구의 메시지 ...)

 */

@RestController
@RequiredArgsConstructor
@Slf4j
public class GlobalWebSocketController {

	private final SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/global")
	public void sendToAll(@Payload GlobalMessageDto globalMessageDto, Principal principal){
		log.info("alarm - {} 동작, {}", globalMessageDto.getType(), globalMessageDto.getData());

		Authentication authentication = (Authentication) principal;
		String nickname = authentication.getName(); // 닉네임임

		switch (globalMessageDto.getType()) {
			case "SEARCH_USER":

				break;
			case "FRIEND_REQUEST":
				String fromUser = nickname;
				globalMessageDto.getData().put("fromUser", nickname);
				String toUser = (String) globalMessageDto.getData().get("toUser");
				simpMessagingTemplate.convertAndSendToUser(toUser, "/sub/global", globalMessageDto);
				break;

		}
	}

	@MessageMapping("/global.one")
	public void sendToOne(@Payload GlobalMessageDto globalMessageDto, Principal principal){
		log.info("alarm - {} 동작, {}", globalMessageDto.getType(), globalMessageDto.getData());

		Authentication authentication = (Authentication) principal;
		String nickname = authentication.getName(); // 닉네임임

		switch (globalMessageDto.getType()) {
			case "SEARCH_USER":

				break;
			case "FRIEND_REQUEST":
				String fromUser = nickname;
				globalMessageDto.getData().put("fromUser", nickname);
				String toUser = (String) globalMessageDto.getData().get("toUser");
				simpMessagingTemplate.convertAndSendToUser(toUser, "/sub/global.one", globalMessageDto);
				break;

		}
	}


}
