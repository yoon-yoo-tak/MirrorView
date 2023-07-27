package com.mirrorview.domain.interview.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@RedisHash
public class InterviewRoom {

	private String title;
	private String host;
	private List<RoomMemberInfo> members = new ArrayList<>();
	private String password;
	private Integer maxMemberCount;
	private String category;
	private boolean isStarted;
	private LocalDateTime timestamp;

}
