package com.mirrorview.global.alarm.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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

	@MessageMapping("/alarm")
	public void sendToAll(@Payload GlobalMessageDto alarmMessageDto, Principal principal){
		log.info("alarm - {} 동작, {}", alarmMessageDto.getType(), alarmMessageDto.getData());

		Authentication authentication = (Authentication) principal;
		String nickname = authentication.getName(); // 닉네임임

		switch (alarmMessageDto.getType()) {
			case "1":

				break;

		}
	}
}
