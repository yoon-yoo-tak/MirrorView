package com.mirrorview.domain.chatroom.service;

import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.repository.ChatRepository;

import java.util.*;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService{

	private final ChatRepository chatRepository;
	private Map<String, String> userRoomMap = new ConcurrentHashMap<>();
	private AtomicInteger totalUserCount = new AtomicInteger(0);

	public List<ChatRoom> allRoom(){

		return (List<ChatRoom>)chatRepository.findAll();
	}

	@Override
	public ChatRoom createChatRoom(String roomId) {
		Optional<ChatRoom> byId = chatRepository.findById(roomId);
		if(byId.isPresent()){
			throw new RuntimeException("방이 존재합니다.");
		}

		Set<String> users = new HashSet<>();
		List<ChatMessage> messages = new ArrayList<>();

		ChatRoom chatRoom = ChatRoom.builder()
			.id(roomId)
			.users(users)
			.messages(messages)
			.build();
		chatRepository.save(chatRoom);
		return chatRoom;
	}
	@Override
	public void deleteChatRoom(String roomId) {
		chatRepository.deleteById(roomId);
	}
	@Override
	public ChatRoom addUserToChatRoom(String roomId, String userId) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.getUsers().add(userId);
			userRoomMap.put(userId, roomId);
			return chatRepository.save(chatRoom);
		}else{
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}
	@Override
	public ChatRoom removeUserFromChatRoom(String roomId, String userId) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.getUsers().remove(userId);
			return chatRepository.save(chatRoom);
		}else{
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}
	@Override
	public ChatRoom addChatMessageToChatRoom(String roomId, ChatMessage chatMessage) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.getMessages().add(chatMessage);
			return chatRepository.save(chatRoom);
		}else{
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	@Override
	public Set<String> getUsersInChatRoom(String roomId) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			return chatRoom.getUsers();
		}else{
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	@Override
	public List<ChatMessage> getChat(String roomId){
		Optional<ChatRoom> chatRoom = chatRepository.findById(roomId);
		if(chatRoom.isPresent()){
			List<ChatMessage> chatMessages = chatRoom.get().getMessages();
			return chatMessages;
		}else
			throw new RuntimeException("방이 없음");
	}


	@Override
	public int getCountOfUsersInChatRoom(String roomId) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			return chatRoom.getUsers().size();
		}else{
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}
	@Override
	public String userInRoom(String userId){
		return userRoomMap.get(userId);
	}

	@Override
	public void incrementUserCount(String userid) {
		log.info("입장한 유저: {}, 현재 접속 인원: {}", userid, totalUserCount.incrementAndGet());
	}

	@Override
	public void decrementUserCount(String userid) {
		log.info("퇴장한 유저: {}, 현재 접속 인원: {}", userid, totalUserCount.decrementAndGet());
	}

	@Override
	public long totalUserCount(){
		return totalUserCount.get();
	}

	// public Optional<ChatRoom> findChatRoomById(String roomId) {
	// 	return chatRepository.findById(roomId);
	// }
}
