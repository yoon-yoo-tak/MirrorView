package com.mirrorview.domain.chatroom.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
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
@RedisHash("ChatRoom")
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatRoom {
	@Id
	private String id;
	@Builder.Default
	private Set<String> users = new HashSet<>();
	@Builder.Default
	private List<ChatMessage> messages = new ArrayList<>();

}