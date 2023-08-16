package com.mirrorview.domain.notice.dto;

import com.mirrorview.domain.notice.domain.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class BoardDto {

    private Long id;
    private String title;
    private String content;
    private String userId;
    private LocalDateTime createdTime;

    public static BoardDto build(Board board) {
        return BoardDto.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .userId(board.getMember().getNickname())
                .createdTime(board.getCreatedTime())
                .build();
    }
}
