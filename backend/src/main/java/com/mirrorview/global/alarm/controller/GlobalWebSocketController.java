package com.mirrorview.global.alarm.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatPrivateRoom;
import com.mirrorview.domain.chatroom.service.ChatPrivateService;
import com.mirrorview.domain.interview.dto.MessageDto;
import com.mirrorview.global.alarm.domain.Notification;
import com.mirrorview.global.alarm.dto.GlobalMessageDto;
import com.mirrorview.global.alarm.service.GlobalWebSocketService;
import com.mirrorview.global.alarm.service.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
	기능 :
	현재 실시간 접속 유저
	알람 (친구 요청, 친구의 메시지 ...)

 */

@RestController
@RequiredArgsConstructor
@Slf4j
public class GlobalWebSocketController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final NotificationService notificationService;
	private final GlobalWebSocketService globalWebSocketService;
	private final ChatPrivateService chatPrivateService;

	@MessageMapping("/global")
	public void sendToAll(@Payload GlobalMessageDto globalMessageDto, Principal principal){
		log.info("alarm - {} 동작, {}", globalMessageDto.getType(), globalMessageDto.getData());

		Authentication authentication = (Authentication) principal;
		String nickname = authentication.getName(); // 닉네임임

		switch (globalMessageDto.getType()) {
			case "GLOBAL_MESSAGE":
				String message = (String) globalMessageDto.getData().get("message");
				Notification globalNotification = notificationService.createAndSaveNotification("ALL", message);
				globalMessageDto.getData().put("notification", globalNotification);
				simpMessagingTemplate.convertAndSend("/sub/global", globalMessageDto);
				break;
		}
	}

	@MessageMapping("/global.one")
	public void sendToOne(@Payload GlobalMessageDto globalMessageDto, Principal principal){
		log.info("alarm - {} 동작, {}", globalMessageDto.getType(), globalMessageDto.getData());

		Authentication authentication = (Authentication) principal;
		String nickname = authentication.getName(); // 닉네임임

		switch (globalMessageDto.getType()) {
			case "FRIEND_REQUEST":
				String fromUser = nickname;
				globalMessageDto.getData().put("fromUser", nickname);
				String toUser = (String) globalMessageDto.getData().get("toUser");

				String message = fromUser+"님이 친구 요청을 보냈습니다.";

				Notification notification = notificationService.createAndSaveNotification(toUser, message);
				globalMessageDto.getData().put("notification", notification);

				if(globalWebSocketService.isUserOnline(toUser))
					simpMessagingTemplate.convertAndSendToUser(toUser, "/sub/global.one", globalMessageDto);
				break;

			case "FRIEND_ACCEPTED":
				String friendFromUser = nickname;
				String messageFriend = friendFromUser+"님이 친구 요청을 수락했습니다.";

				globalMessageDto.getData().put("fromUser", nickname);
				String friendToUser = (String) globalMessageDto.getData().get("toUser");

				Notification acceptedNotification = notificationService.createAndSaveNotification(friendToUser, messageFriend);
				globalMessageDto.getData().put("notification", acceptedNotification);

				if(globalWebSocketService.isUserOnline(friendToUser))
					simpMessagingTemplate.convertAndSendToUser(friendToUser, "/sub/global.one", globalMessageDto);
				break;

			case "GET_PRIVATE_ROOMS":
				List<ChatPrivateRoom> allChatRoomsForUser = chatPrivateService.getAllChatRoomsForUser(nickname);
				globalMessageDto.getData().put("rooms", allChatRoomsForUser);
				simpMessagingTemplate.convertAndSendToUser(nickname, "/sub/global.one", globalMessageDto);
				break;
			case "GET_PRIVATE_ROOM":
				String privateFromUser = nickname;
				String privateToUser = (String) globalMessageDto.getData().get("toUser");

				// 채팅방을 가져옴, 없으면 만든다. (두 사용자 사이에)
				ChatPrivateRoom existingRoom = chatPrivateService.getPrivateChatRoom(privateFromUser, privateToUser);

				Map<String, Object> roomData = new HashMap<>();
				roomData.put("roomId", existingRoom.getId());
				roomData.put("fromUser", privateFromUser);
				roomData.put("make", (String) globalMessageDto.getData().get("make"));
				globalMessageDto.setData(roomData);

				// 방을 만들때는 알림을 안보냄
				if(roomData.get("make").equals("now"))
					return;

				// 한명의 유저가 채팅방에 입장하면, 상대방에게 알림을 줌
				String messagePrivate = privateFromUser+"님이 개인 채팅을 신청했습니다.";
				Notification privateChatNotification = notificationService.createAndSaveNotification(privateToUser, messagePrivate);
				globalMessageDto.getData().put("notification", privateChatNotification);
				if(globalWebSocketService.isUserOnline(privateToUser)) {
					simpMessagingTemplate.convertAndSendToUser(privateToUser, "/sub/global.one", globalMessageDto);
				}

				break;

			case "GET_PRIVATE_ROOM_CHAT":
				String roomId = (String) globalMessageDto.getData().get("roomId");
				List<ChatMessage> privateChat = chatPrivateService.getPrivateChat(roomId);
				globalMessageDto.getData().put("chatList", (Object)privateChat);
				simpMessagingTemplate.convertAndSendToUser(nickname, "/sub/global.one", globalMessageDto);
				break;

			case "SEND_PRIVATE_ROOM":
				String roomIdSend = (String) globalMessageDto.getData().get("roomId");
				String messageSend = (String) globalMessageDto.getData().get("message");
				String toUserSend = (String) globalMessageDto.getData().get("toUser");

				ChatMessage messageDto = ChatMessage.builder()
					.userNickname(nickname)
					.message(messageSend)
					.timestamp(LocalDateTime.now())
					.build();

				globalMessageDto.getData().put("message", messageDto);

				chatPrivateService.addChatMessageToPrivateRoom(roomIdSend, messageDto);
				simpMessagingTemplate.convertAndSendToUser(nickname, "/sub/global.one", globalMessageDto);
				simpMessagingTemplate.convertAndSendToUser(toUserSend, "/sub/global.one", globalMessageDto);
				break;
			case "DELETE_PRIVATE_ROOM":
				String roomIdToDelete = (String) globalMessageDto.getData().get("roomId");
				String toUserDelete = (String) globalMessageDto.getData().get("toUser");
				String toFromUserDelete = (String) globalMessageDto.getData().get("fromUser");

				// 채팅방 삭제 로직 실행
				chatPrivateService.deletePrivateChatRoom(roomIdToDelete);

				simpMessagingTemplate.convertAndSendToUser(toFromUserDelete, "/sub/global.one", globalMessageDto);
				if(globalWebSocketService.isUserOnline(toUserDelete)) {
					simpMessagingTemplate.convertAndSendToUser(toUserDelete, "/sub/global.one", globalMessageDto);
				}
				break;

		}
	}


}
