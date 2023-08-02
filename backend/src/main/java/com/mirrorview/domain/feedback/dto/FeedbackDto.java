package com.mirrorview.domain.feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

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
    private String question;
    private String answer;
}
