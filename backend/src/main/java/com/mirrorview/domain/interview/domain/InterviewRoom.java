package com.mirrorview.domain.interview.domain;

import com.mirrorview.domain.essay.dto.EssayListDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@RedisHash(value = "interviewRoom")
@ToString
public class InterviewRoom {

    @Id
    private String id;
    @Indexed
    private String title;
    private String host;
    private List<RoomMemberInfo> members = new ArrayList<>();
    private String password;
    private Integer maxMemberCount;
    @Indexed
    private String category;
    private boolean isStarted;
    private LocalDateTime timestamp;

    public void join(String nickname, List<EssayListDto> essayList) {
        members.add(RoomMemberInfo.builder()
                .nickname(nickname)
                .ready(false)
                .essays(essayList)
                .role("interviewee")
                .build());
    }

    public int getCurrentCount() {
        return members.size();
    }

    public Boolean havePassword() {
        return !password.isEmpty();
    }

    public boolean exit(String nickname) {
        List<RoomMemberInfo> memberInfoList = members.stream()
                .filter(roomMemberInfo -> !roomMemberInfo.sameNickname(nickname))
                .collect(Collectors.toList());
        if (memberInfoList.size() == members.size()) {
            return false;
        }
        members = new ArrayList<>(memberInfoList);
        if (nickname.equals(host)) {
            changeHost(members.get(0).getNickname());
        }
        return true;
    }

    private void changeHost(String nickname) {
        this.host = nickname;
    }

    public void changeReady(RoomMemberInfo memberInfo) {
        members.forEach(member -> {
            if (member.sameNickname(memberInfo.getNickname())) {
                member.changeReady();
            }
        });
    }
}
