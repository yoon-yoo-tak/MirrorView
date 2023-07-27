package com.mirrorview.domain.interview.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
}
