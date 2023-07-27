package com.mirrorview.domain.interview.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class RoomResponseDto {

	private String roomId;
	private String title;
	private String category;
	private Integer maxMemberCount;
	private Integer currentMemberCount;
	private Boolean havePassword;


	public static RoomResponseDto build(String roomId, Map<Object, Object> entries) {
		return RoomResponseDto
			.builder()
			.roomId(roomId)
			.title((String)entries.get("title"))
			.category((String)entries.get("category"))
			.maxMemberCount((Integer)entries.get("maxMemberCount"))
			.currentMemberCount(((List<?>)entries.get("members")).size())
			.havePassword(entries.containsKey("password"))
			.build();
	}
}
