package com.mirrorview.global.alarm.domain;

import org.checkerframework.checker.units.qual.A;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("Notification")
public class Notification implements Serializable {
	@Id
	private String id;

	@Indexed
	private String nickname;

	private String message;
	private LocalDateTime timestamp;
	@Indexed
	private boolean read;

	@Indexed
	private String sender;

	@Indexed
	private String receiver;

}