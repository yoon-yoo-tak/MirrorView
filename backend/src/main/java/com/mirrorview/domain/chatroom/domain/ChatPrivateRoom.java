package com.mirrorview.domain.chatroom.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@RedisHash("ChatPrivateRoom")
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatPrivateRoom {
	@Id
	private String id = UUID.randomUUID().toString();
	@Indexed
	private String sender;
	@Indexed
	private String receiver;

	@Builder.Default
	private List<ChatMessage> messages = new ArrayList<>();
}