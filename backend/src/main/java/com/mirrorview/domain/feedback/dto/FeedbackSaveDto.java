package com.mirrorview.domain.feedback.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeedbackSaveDto {
	private String content;
	private String roomId;
	private String roomTitle;
	private String receiver;
}
