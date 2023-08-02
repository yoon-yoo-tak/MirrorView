package com.mirrorview.domain.essay.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EssayDto {
	private Long id;
	private String title;
	private LocalDateTime createdTime;
}
