package com.mirrorview.domain.chatroom.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketEventsService {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public void handleWebSocketConnectListener(String userId) {
        chatService.incrementUserCount(userId);
    }

    public void handleWebSocketDisconnectListener(String userId) {
        chatService.decrementUserCount(userId);
    }

    public void handleWebSocketSubscribeListener(String roomId, String userId) {
        chatService.addUserToChatRoom(roomId, userId);
    }

    public void handleSessionUnsubscribeEvent(String roomId, String userId) {
        chatService.removeUserFromChatRoom(roomId, userId);
    }
}