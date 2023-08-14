package com.mirrorview.domain.chatroom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.mirrorview.domain.chatroom.domain.ChatPrivateRoom;

public interface ChatPrivateRepository extends CrudRepository<ChatPrivateRoom, String> {
	List<ChatPrivateRoom> findBySender(String sender);
	List<ChatPrivateRoom> findByReceiver(String receiver);
	Optional<ChatPrivateRoom> findBySenderAndReceiver(String sender, String receiver);

	List<ChatPrivateRoom> findBySenderOrReceiver(String sender, String receiver);
}
