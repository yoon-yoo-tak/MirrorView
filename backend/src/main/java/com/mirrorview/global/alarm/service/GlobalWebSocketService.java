package com.mirrorview.global.alarm.service;

import com.mirrorview.domain.user.domain.Member;
import com.mirrorview.domain.user.repository.MemberRepository;
import com.mirrorview.global.alarm.domain.RealTimeUser;
import com.mirrorview.global.alarm.repository.RealTimeUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GlobalWebSocketService {
    private final RealTimeUserRepository realTimeUserRepository;
    private final MemberRepository memberRepository;

    public List<RealTimeUser> searchRealTimeUsers() {
        return realTimeUserRepository.findAll();
    }

    public void enter(String nickname) {
        Member member = memberRepository.findByNickname(nickname).orElseThrow(() -> new IllegalArgumentException());
        realTimeUserRepository.save(new RealTimeUser(member.getUserId(), nickname));
    }

    public void exit(String nickname) {
        RealTimeUser realTimeUser = realTimeUserRepository.findById(nickname).orElseThrow(() -> new IllegalStateException("접속자 목록에 없습니다."));
        realTimeUserRepository.delete(realTimeUser);
    }

    public boolean isUserOnline(String nickname){
        // redis online 에 userId랑 nickname이랑 반대로 되있음
        Optional<RealTimeUser> byUserId = realTimeUserRepository.findByUserId(nickname);
        System.out.println(byUserId.isPresent());
        System.out.println(byUserId.get());

        if(byUserId.isPresent()){
            return true;
        }
        return false;
    }
}

