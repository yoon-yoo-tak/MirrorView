package com.mirrorview.domain.essay.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EssayUpdateDto {
	private Long id;
	private String title;
	private List<EssayDetailUpdateDto> essayDetails = new ArrayList<>();
}
