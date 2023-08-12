package com.mirrorview.global.alarm.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.mirrorview.global.alarm.domain.Notification;
import com.mirrorview.global.alarm.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
	private final NotificationRepository notificationRepository;

	// 알림 메시지 생성
	public Notification createAndSaveNotification(String nickname, String message) {
		Notification notification = new Notification();
		notification.setId(UUID.randomUUID().toString());
		notification.setMessage(message);
		notification.setNickname(nickname);
		notification.setTimestamp(LocalDateTime.now());
		notification.setRead(false);

		return notificationRepository.save(notification);
	}

 	// 특정 알림 ID로 알림 조회
	public Optional<Notification> findNotificationById(String notificationId) {
		return notificationRepository.findById(notificationId);
	}

	// 특정 사용자의 읽지 않은 알림 리스트 조회
	public List<Notification> getUnreadNotifications(String nickname) {
		return notificationRepository.findByNicknameAndReadFalse(nickname);
	}

	// 알림이 읽어지면 삭제
	public void notificationAsRead(String notificationId) {
		Optional<Notification> optionalNotification = findNotificationById(notificationId);
		if (optionalNotification.isPresent()) {
			notificationRepository.deleteById(notificationId);
		}
	}
}
