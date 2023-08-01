package com.mirrorview.domain.feedback.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {
	private Long id;
	private String content;
	private LocalDateTime createdTime;
	private Long roomId;
	private String nickname;
}
