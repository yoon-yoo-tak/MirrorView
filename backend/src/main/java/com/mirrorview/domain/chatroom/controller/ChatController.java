package com.mirrorview.domain.chatroom.controller;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.service.ChatUserService;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

	private final ChatUserService chatUserService;

	@GetMapping("/favorites/{userId}")
	public ResponseEntity<?> getFavoritesByUserId(@PathVariable String userId) {
		Set<ChatRoom> favoriteRooms = chatUserService.findFavoriteRoomsByUserId(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "유저의 즐겨찾기 방", favoriteRooms);
	}

	@PostMapping("/{userId}/favorites/{roomId}")
	public ResponseEntity<?> addChatRoomToFavorites(@PathVariable String userId, @PathVariable String roomId) {
		chatUserService.addChatRoomToFavorites(userId, roomId);
		Set<ChatRoom> favoriteRooms = chatUserService.findFavoriteRoomsByUserId(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "유저 즐겨찾기 등록 완료", favoriteRooms);
	}

	@DeleteMapping("/{userId}/favorites/{roomId}")
	public ResponseEntity<?> removeChatRoomFromFavorites(@PathVariable String userId, @PathVariable String roomId) {
		chatUserService.removeChatRoomFromFavorites(userId, roomId);
		Set<ChatRoom> favoriteRooms = chatUserService.findFavoriteRoomsByUserId(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "유저 즐겨찾기 삭제 완료", favoriteRooms);
	}
}