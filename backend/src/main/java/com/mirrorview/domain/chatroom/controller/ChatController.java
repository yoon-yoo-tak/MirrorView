package com.mirrorview.domain.chatroom.controller;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.service.ChatUserService;
import com.mirrorview.global.auth.security.CustomMemberDetails;
import com.mirrorview.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

	private final ChatUserService chatUserService;

	@GetMapping("/find")
	public ResponseEntity<?> findUserInRedis(@AuthenticationPrincipal CustomMemberDetails customMemberDetails){
		chatUserService.findUserInRedis(customMemberDetails.getUsername(), customMemberDetails.getNickname());
		return  BaseResponse.ok(HttpStatus.OK, "유저를 redis에 등록함");
	}

	@GetMapping("/favorites")
	public ResponseEntity<?> getFavoritesByUserId( @AuthenticationPrincipal
		CustomMemberDetails customMemberDetails) {
		String userId = customMemberDetails.getUsername();
		Set<ChatRoom> favoriteRooms = chatUserService.findFavoriteRoomsByUserId(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "유저 즐겨찾기 방 리스트 가져오기", favoriteRooms);
	}

	@PostMapping("/favorites/{roomId}")
	public ResponseEntity<?> addChatRoomToFavorites(@PathVariable String roomId,
	@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
		String userId = customMemberDetails.getUsername();
		chatUserService.addChatRoomToFavorites(userId, roomId);
		Set<ChatRoom> favoriteRooms = chatUserService.findFavoriteRoomsByUserId(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "유저 즐겨찾기 등록 완료", favoriteRooms);
	}

	@DeleteMapping("/favorites/{roomId}")
	public ResponseEntity<?> removeChatRoomFromFavorites(@PathVariable String roomId,
		@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
		String userId = customMemberDetails.getUsername();
		chatUserService.removeChatRoomFromFavorites(userId, roomId);
		Set<ChatRoom> favoriteRooms = chatUserService.findFavoriteRoomsByUserId(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "유저 즐겨찾기 삭제 완료", favoriteRooms);
	}
}