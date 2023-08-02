package com.mirrorview.domain.interview.domain;

import com.mirrorview.domain.essay.dto.EssayListDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RoomMemberInfo {

    private String nickname;
    private boolean ready;
    private List<EssayListDto> essays = new ArrayList<>();


    public boolean sameNickname(String nickname) {
        return nickname.equals(this.nickname);
    }

    public void changeReady() {
        ready = !ready;
    }
}
