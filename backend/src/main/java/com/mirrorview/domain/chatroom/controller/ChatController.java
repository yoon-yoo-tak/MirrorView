package com.mirrorview.domain.chatroom.controller;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 웹 소켓 api
 */

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;

    // 전체 방 가져오기
    @MessageMapping("/chatrooms.get")
    public void getChatRooms(Principal principal) {
        log.info("전체 방 가져오기");
        List<ChatRoom> chatRooms = chatService.allRoom();
        System.out.println(chatRooms);
        simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/sub/chatrooms", chatRooms);
    }

    // 채팅 방 채팅기록
    @MessageMapping("/chatrooms/{roomId}")
    public void getChat(@DestinationVariable String roomId, Principal principal) {
        log.info("각 채팅방 채팅 기록");
        List<ChatMessage> chatMessages = chatService.getChat(roomId);
        simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/sub/chatrooms/" + roomId, chatMessages);
    }

    // 채팅 보내기
    @MessageMapping("/chatrooms.send/{roomId}")
    public void sendChat(@DestinationVariable String roomId, ChatMessage chatMessage, Principal principal) {
        log.info("채팅 보내기");
        chatMessage.setTimestamp(LocalDateTime.now());
        String userId = principal.getName();
        chatService.addChatMessageToChatRoom(roomId, chatMessage);
        simpMessagingTemplate.convertAndSend("/sub/chatrooms/" + roomId, chatMessage);
    }

    // 방만들기
    @MessageMapping("/chatrooms.create")
    public void createChatRoom(ChatRoom chatRoom) {
        log.info("방만들기");
        ChatRoom newChatRoom = chatService.createChatRoom(chatRoom.getId());
        simpMessagingTemplate.convertAndSend("/sub/chatrooms.create", newChatRoom);
    }


}
