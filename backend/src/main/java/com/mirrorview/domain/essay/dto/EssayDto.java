package com.mirrorview.domain.essay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EssayDto {
    private Long id;
    private String title;
    private LocalDateTime createdTime;
}
