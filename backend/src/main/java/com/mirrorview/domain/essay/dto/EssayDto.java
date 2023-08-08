package com.mirrorview.domain.essay.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import com.mirrorview.domain.essay.domain.Essay;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EssayDto {
    private Long id;
    private String title;
    private LocalDateTime createdTime;

    public static EssayDto toDto(Essay essay){
        return EssayDto.builder()
            .id(essay.getId())
            .title(essay.getTitle())
            .createdTime(essay.getCreatedTime())
            .build();
    }
}
