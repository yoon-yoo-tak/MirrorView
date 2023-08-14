package com.mirrorview.domain.interview.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import com.mirrorview.domain.essay.dto.EssayListDto;
import com.mirrorview.domain.user.domain.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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

    public void join(Member member, List<EssayListDto> essayList) {
        if (members.size() == maxMemberCount) {
            throw new IllegalStateException("최대 인원수를 초과했습니다.");
        }
        members.add(RoomMemberInfo.builder()
                .nickname(member.getNickname())
                .email(member.getEmail())
                .rating(member.getAverageRating())
                .ready(false)
                .essays(essayList)
                .role("interviewee")
                .photo(member.getPhoto())
                .build());
    }

    public int getCurrentCount() {
        return members.size();
    }

    public Boolean havePassword() {
        return !password.isEmpty();
    }

    public String exit(String nickname) {
        List<RoomMemberInfo> memberInfoList = members.stream()
                .filter(roomMemberInfo -> !roomMemberInfo.sameNickname(nickname))
                .collect(Collectors.toList());
        if (memberInfoList.size() == members.size()) {
            return "error";
        }
        members = new ArrayList<>(memberInfoList);
        if (nickname.equals(host)) {
            changeHost(members.get(0).getNickname());
        }
        return host;
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

    public void startedState(){
        isStarted = true;
    }
}
