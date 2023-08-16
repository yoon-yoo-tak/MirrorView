package com.mirrorview.global.alarm.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.global.alarm.domain.Notification;
import com.mirrorview.global.alarm.repository.NotificationRepository;
import com.mirrorview.global.alarm.repository.RealTimeUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {
	private final NotificationRepository notificationRepository;
	private final RealTimeUserRepository realTimeUserRepository;
	private final SimpMessagingTemplate template;

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
	
	// 채팅을 보낼 떄, 일대일 채팅 알림 용도
	public void sendNotificationIfRequired(String sender, String receiverNickname, ChatMessage chatMessage) {
		boolean receiverOnline = realTimeUserRepository.existsById(receiverNickname);
		if (receiverOnline) {
			Optional<Notification> existingNotification = notificationRepository.findBySenderAndNickname(sender, receiverNickname);
			if (!existingNotification.isPresent() || (existingNotification.isPresent() && !existingNotification.get().isRead())) {
				Notification notification = Notification.builder()
					.sender(sender)
					.nickname(receiverNickname)
					//.message(chatMessage.getContent())
					.timestamp(LocalDateTime.now())
					.read(false)
					.build();
				notificationRepository.save(notification);
				template.convertAndSendToUser(receiverNickname, "/queue/chat", chatMessage);
			}
		} else {
			Notification notification = Notification.builder()
				.sender(sender)
				.nickname(receiverNickname)
				//.message(chatMessage.getContent())
				.timestamp(LocalDateTime.now())
				.read(false)
				.build();
			notificationRepository.save(notification);
		}
	}

}
