package com.mirrorview.domain.feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackSaveDto {
	private String content;
	private Long roomId;
	private Long essayDetailId;
	private Long userId;
}
