package com.mirrorview.domain.chatroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

import com.mirrorview.domain.chatroom.event.WebSocketEvents;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatCommonServiceImpl {

	private final WebSocketEvents webSocketEvents;

	public int getUserCount() {
		return webSocketEvents.getUsers().size();
	}

	public Set<String> getUserNames() {
		return webSocketEvents.getUsers();
	}
}