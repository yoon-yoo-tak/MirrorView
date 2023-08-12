package com.mirrorview.global.alarm.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.mirrorview.global.alarm.domain.Notification;
import com.mirrorview.global.alarm.service.NotificationService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/alarms")
public class NotificationController {

	private final NotificationService notificationService;

	@GetMapping("/unread")
	public ResponseEntity<?> unReadNotificationList(@AuthenticationPrincipal CustomMemberDetails user){
		log.info("나에게 온 읽지 않은 알림들 가져오기");
		List<Notification> unreadNotifications = notificationService.getUnreadNotifications(user.getNickname());
		return BaseResponse.okWithData(HttpStatus.OK, "읽지않은 알림 리스트", unreadNotifications);
	}

	@PostMapping("/read/{notificationId}")
	public ResponseEntity<?> readNotification(@AuthenticationPrincipal CustomMemberDetails user, @PathVariable String notificationId){
		notificationService.notificationAsRead(notificationId);
		return BaseResponse.ok(HttpStatus.OK, "알림을 읽음");
	}

}
