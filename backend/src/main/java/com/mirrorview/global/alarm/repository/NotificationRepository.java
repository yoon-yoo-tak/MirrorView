package com.mirrorview.global.alarm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.mirrorview.global.alarm.domain.Notification;

public interface NotificationRepository extends CrudRepository<Notification, String> {
	List<Notification> findByNicknameAndReadFalse(String userId);  // Read False인 알림만 조회

	Optional<Notification> findBySenderAndNickname(String sender, String nickname); // 일대일 채팅 알림 read & unread
}
