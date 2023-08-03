package com.mirrorview.domain.chatroom.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.mirrorview.domain.chatroom.domain.ChatMessage;
import com.mirrorview.domain.chatroom.domain.ChatRoom;
import com.mirrorview.domain.chatroom.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import lombok.Getter;

@Service
@RequiredArgsConstructor
@Slf4j
@Getter
public class ChatServiceImpl implements ChatService{

	private final SimpMessagingTemplate template;
	private final ChatRepository chatRepository;
	private final Map<String, String> userRoomMap = new ConcurrentHashMap<>();
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
			.count(0)
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
			throw new RuntimeException("방이 존재하지 않습니다.");
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

	public void userInRoomSet(String userId, String roomId){
		userRoomMap.put(userId, roomId);
	}

	@Override
	public void incrementUserCount(String userid) {
		log.info("입장한 유저: {}, 현재 접속 인원: {}", userid, totalUserCount.incrementAndGet());
		totalUserCount();
	}

	@Override
	public void decrementUserCount(String userid) {
		log.info("퇴장한 유저: {}, 현재 접속 인원: {}", userid, totalUserCount.decrementAndGet());
		totalUserCount();
	}

	@Override
	public long totalUserCount(){
		template.convertAndSend("/sub/count", totalUserCount.get());
		return 0;
	}

	@Override
	public void incrementRoomCount(String userId, String roomId) {
		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.setCount(chatRoom.getCount() + 1);
			userRoomMap.put(userId, roomId);
			chatRepository.save(chatRoom);
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

	@Override
	public void decrementRoomCount(String userId, String roomId) {
		if(!userRoomMap.containsKey(userId))
			return;

		Optional<ChatRoom> chatRoomOptional = chatRepository.findById(roomId);
		if(chatRoomOptional.isPresent()){
			ChatRoom chatRoom = chatRoomOptional.get();
			chatRoom.setCount(chatRoom.getCount() - 1);
			userRoomMap.remove(userId);
			chatRepository.save(chatRoom);
		} else {
			throw new RuntimeException("방이 존재하지 않습니다.");
		}
	}

    // public Optional<ChatRoom> findChatRoomById(String roomId) {
    // 	return chatRepository.findById(roomId);
    // }
}
