package com.mirrorview.domain.chatroom.domain;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@RedisHash("ChatUser")
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatUser {
	@Id
	private String userId;
	private String nickname;
	@Builder.Default
	private Set<String> favoriteChatRoomIds = new HashSet<>();
}