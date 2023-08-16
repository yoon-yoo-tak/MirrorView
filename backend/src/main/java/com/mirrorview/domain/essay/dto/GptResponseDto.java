package com.mirrorview.domain.essay.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GptResponseDto {
	private String id;
	private String object;
	private long created;
	@JsonProperty("choices")
	private List<Choice> choices;
	private String model;
	private Usage usage;

	public String getContent() {
		if (this.choices.isEmpty()) {
			throw new RuntimeException("GPT 답변이 비어있습니다. choice");
		} else {
			return this.choices.get(0).message.getContent();
		}
	}

	@Getter
	public static class Choice {
		private int index;
		private Message message;
		private String finish_reason;
	}

	@Getter
	public static class Message {
		private String role;
		private String content;

	}

	public static class Usage {
		@JsonProperty("prompt_tokens")
		private int prompt_tokens;
		@JsonProperty("completion_tokens")
		private int completion_tokens;
		@JsonProperty("total_tokens")
		private int total_tokens;

	}
}
