package com.mirrorview.domain.chatroom.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

// (내 채팅)즐겨찾기에 사용될 repository
@Repository
public class UserChatRoomsRepository {

    private final RedisTemplate<String, List<String>> redisTemplate;
    private ValueOperations<String, List<String>> valueOperations;

    public UserChatRoomsRepository(RedisTemplate<String, List<String>> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @PostConstruct
    public void init() {
        valueOperations = redisTemplate.opsForValue();
    }

    public List<String> getChatRoomTitles(String userId) {
        return valueOperations.get(userId);
    }

    public void addChatRoomTitle(String userId, String chatRoomTitle) {
        List<String> chatRoomTitles = getChatRoomTitles(userId);
        if (chatRoomTitles != null) {
            chatRoomTitles.add(chatRoomTitle);
            valueOperations.set(userId, chatRoomTitles);
        } else {
            chatRoomTitles = new ArrayList<>();
            chatRoomTitles.add(chatRoomTitle);
            valueOperations.set(userId, chatRoomTitles);
        }
    }

    // 유저 아이디와 방제목을 이용하여 해당 유저의 방 리스트에서 특정 방을 제거하는 기능
    public void removeChatRoomTitle(String userId, String chatRoomTitle) {
        List<String> chatRoomTitles = getChatRoomTitles(userId);
        if (chatRoomTitles != null) {
            chatRoomTitles.remove(chatRoomTitle);
            valueOperations.set(userId, chatRoomTitles);
        }
    }
}
