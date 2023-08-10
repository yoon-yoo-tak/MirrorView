package com.mirrorview.global.alarm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mirrorview.global.alarm.domain.RealTimeUser;
import com.mirrorview.global.alarm.repository.RealTimeUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GlobalWebSocketService {
	private final RealTimeUserRepository realTimeUserRepository;

	public List<RealTimeUser> searchRealTimeUsers(){
		return realTimeUserRepository.findAll();
	}

}
