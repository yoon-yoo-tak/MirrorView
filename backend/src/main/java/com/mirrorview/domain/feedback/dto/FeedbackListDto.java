package com.mirrorview.domain.feedback.dto;

import java.time.LocalDateTime;

import com.mirrorview.domain.feedback.domain.Feedback;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackListDto {
	private Long id;
	private String title;
	private LocalDateTime createdTime;

	public static FeedbackListDto toDto(Feedback feedback){
		return FeedbackListDto.builder()
			.id(feedback.getId())
			.title(feedback.getRoomTitle())
			.createdTime(feedback.getCreatedTime())
			.build();
	}
}
