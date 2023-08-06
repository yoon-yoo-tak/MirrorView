package com.mirrorview.domain.interview.domain;

import java.util.ArrayList;
import java.util.List;

import com.mirrorview.domain.essay.dto.EssayListDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class RoomMemberInfo {

    private String nickname;
    private String email;
    private float rating;
    private boolean ready;
    private List<EssayListDto> essays = new ArrayList<>();
    private String role;

	public boolean sameNickname(String nickname) {
		return nickname.equals(this.nickname);
	}

    public void changeReady() {
        ready = !ready;
    }

    public void changeRole(){
        if (role.equals("interviewee")) {
            role = "interviewer";
        } else if (role.equals("interviewer")) {
            role = "interviewee";
        }
    }
}
