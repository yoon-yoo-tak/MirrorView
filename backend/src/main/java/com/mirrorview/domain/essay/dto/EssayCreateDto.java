package com.mirrorview.domain.essay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EssayCreateDto {
    private String title;
    private List<EssayDetailCreateDto> essayDetails = new ArrayList<>();
}
