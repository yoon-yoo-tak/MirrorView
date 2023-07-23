package com.mirrorview.domain.chatroom.dto;

import java.time.LocalDateTime;

import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@RedisHash("ChatMessage")
public class ChatMessage {
	private String id;
	private String room;
	private String message;
	private LocalDateTime timestamp;
}
