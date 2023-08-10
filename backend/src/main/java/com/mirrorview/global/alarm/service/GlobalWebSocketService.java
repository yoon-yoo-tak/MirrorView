package com.mirrorview.global.alarm.service;

import com.mirrorview.global.alarm.domain.RealTimeUser;
import com.mirrorview.global.alarm.repository.RealTimeUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GlobalWebSocketService {
    private final RealTimeUserRepository realTimeUserRepository;

    public List<RealTimeUser> searchRealTimeUsers() {
        return realTimeUserRepository.findAll();
    }

    public void enter(String nickname) {
        realTimeUserRepository.save(new RealTimeUser(nickname));
    }

    public void exit(String nickname) {
        RealTimeUser realTimeUser = realTimeUserRepository.findById(nickname).orElseThrow(() -> new IllegalStateException("접속자 목록에 없습니다."));
        realTimeUserRepository.delete(realTimeUser);
    }

}
