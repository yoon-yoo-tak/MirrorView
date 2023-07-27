package com.mirrorview.domain.interview.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

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
	private String title;
	private String host;
	private List<RoomMemberInfo> members = new ArrayList<>();
	private String password;
	private Integer maxMemberCount;
	private String category;
	private boolean isStarted;
	private LocalDateTime timestamp;

	public void join(String nickname) {
		members.add(RoomMemberInfo.builder()
			.nickname(nickname)
			.ready(false)
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
}
