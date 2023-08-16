package com.mirrorview.domain.chatroom.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private int count;

    @TimeToLive
    private Long expiration; // in seconds
}