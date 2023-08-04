package com.mirrorview.domain.feedback.dto;

import com.mirrorview.domain.feedback.domain.Feedback;

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
    private String reader;
}
